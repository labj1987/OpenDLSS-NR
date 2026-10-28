// The device and the weights, behind the interface the runtime expects.
//
// The runtime asks the backend for three things here: a GPUDevice it can share, how much activation memory a
// given field costs, and progress while the weights download. Everything else it does through the pipeline.

import { requestDevice } from '../../../src/gpu.js';
import { Model } from '../../../src/model.js';
import { geometryFromValid } from '../../../src/geometry.js';
import { requireWorkgroupStorage } from '../../../src/window/index.js';

/** Activation bytes for a field, measured: 625 MiB of tensors at 576x512, which is 294 912 rows. */
const BYTES_PER_ROW = (625 * 1048576) / 294912;

export class DlssNrWebGpuModel {
  static async create({ activationWidth, activationHeight, activationCapacityScale = 1,
                        onProgress, weights = '/weights' } = {}) {
    const model = new DlssNrWebGpuModel();
    onProgress?.('requesting a device');
    const { device, adapter, info } = await requestDevice();
    model.device = device;
    model.adapter = adapter;
    model.adapterInfo = info;
    // Before the 141 MiB download rather than after it.
    requireWorkgroupStorage(device);
    model.weightsUrl = weights;
    // (message, error, download). The third argument is what drives the overlay's progress bar; passing it
    // second reports every tick as a failure, which the overlay shows and the next tick clears.
    model.weights = await new Model(device).load(weights, (loaded, total) => {
      onProgress?.(`Downloading the model ${(loaded / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MiB`,
                   false, { loaded, total, label: 'DLSS model' });
    });
    model.activationCapacity = 0;
    model.growActivationCapacity(activationWidth, activationHeight, activationCapacityScale);
    return model;
  }

  /**
   * Make room for a padded field of this size: the capacity becomes its activation bytes times `scale`, and never
   * shrinks. Nothing on the device changes - the weights stay where they are, and the buffers sized by the
   * field are the pipeline's, rebuilt for each new field anyway. Returns the new capacity.
   */
  growActivationCapacity(fullWidth, fullHeight, scale = 1) {
    this.activationCapacity = Math.max(this.activationCapacity,
                                       Math.round(this.activationBytesFor(fullWidth, fullHeight) * scale));
    return this.activationCapacity;
  }

  /** Activation bytes for a padded field (the runtime's full dimensions), without headroom. */
  activationBytesFor(fullWidth, fullHeight) {
    return Math.round(fullWidth * fullHeight * BYTES_PER_ROW);
  }

  /** What a field of this size costs in activations, which is what decides whether a resize fits. */
  storageBindingSizeFor(width, height) {
    const geometry = geometryFromValid(width, height);
    return Math.round(geometry.fullRows * BYTES_PER_ROW);
  }

  destroy() {
    this.weights?.destroy();
    this.device?.destroy();
  }
}
