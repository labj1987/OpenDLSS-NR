var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};

// ../node_modules/three/src/core/EventDispatcher.js
var EventDispatcher;
var init_EventDispatcher = __esm({
  "../node_modules/three/src/core/EventDispatcher.js"() {
    EventDispatcher = class {
      /**
       * Adds the given event listener to the given event type.
       *
       * @param {string} type - The type of event to listen to.
       * @param {Function} listener - The function that gets called when the event is fired.
       */
      addEventListener(type, listener) {
        if (this._listeners === void 0) this._listeners = {};
        const listeners = this._listeners;
        if (listeners[type] === void 0) {
          listeners[type] = [];
        }
        if (listeners[type].indexOf(listener) === -1) {
          listeners[type].push(listener);
        }
      }
      /**
       * Returns `true` if the given event listener has been added to the given event type.
       *
       * @param {string} type - The type of event.
       * @param {Function} listener - The listener to check.
       * @return {boolean} Whether the given event listener has been added to the given event type.
       */
      hasEventListener(type, listener) {
        const listeners = this._listeners;
        if (listeners === void 0) return false;
        return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
      }
      /**
       * Removes the given event listener from the given event type.
       *
       * @param {string} type - The type of event.
       * @param {Function} listener - The listener to remove.
       */
      removeEventListener(type, listener) {
        const listeners = this._listeners;
        if (listeners === void 0) return;
        const listenerArray = listeners[type];
        if (listenerArray !== void 0) {
          const index = listenerArray.indexOf(listener);
          if (index !== -1) {
            listenerArray.splice(index, 1);
          }
        }
      }
      /**
       * Dispatches an event object.
       *
       * @param {Object} event - The event that gets fired.
       */
      dispatchEvent(event) {
        const listeners = this._listeners;
        if (listeners === void 0) return;
        const listenerArray = listeners[event.type];
        if (listenerArray !== void 0) {
          event.target = this;
          const array = listenerArray.slice(0);
          for (let i = 0, l = array.length; i < l; i++) {
            array[i].call(this, event);
          }
          event.target = null;
        }
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/Style.js
var Style;
var init_Style = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/Style.js"() {
    Style = class {
      static init(container, nonce = null) {
        const css = (
          /* css */
          `
@scope (.three-inspector) {

	:scope {
		--profiler-background: #1e1e24f5;
		--profiler-header-background: #2a2a33aa;
		--profiler-header: #2a2a33;
		--profiler-border: #4a4a5a;
		--text-primary: #e0e0e0;
		--text-secondary: #9a9aab;
		--color-accent: #00aaff;
		--color-green: #4caf50;
		--color-yellow: #ffc107;
		--color-red: #f44336;
		--color-fps: rgb(63, 81, 181);
		--color-call: rgba(255, 185, 34, 1);
		--font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		--font-mono: 'Courier New', Courier, monospace;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1000;
		overflow: hidden;
		color-scheme: dark;
	}

	:scope * {
		pointer-events: auto;
	}

	.profiler-panel, .profiler-toggle, .detached-tab-panel,
	.profiler-panel *, .profiler-toggle *, .detached-tab-panel * {
		text-transform: initial;
		line-height: normal;
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-tap-highlight-color: transparent;
	}

	.profiler-toggle {
		position: absolute;
		top: 15px;
		right: 15px;
		background-color: rgba(30, 30, 36, 0.85);
		border: 1px solid #4a4a5a54;
		border-radius: 12px 6px 6px 12px;
		color: var(--text-primary);
		cursor: pointer;
		z-index: 1002;
		transition: all 0.2s ease-in-out;
		/*font-size: 14px;*/
		font-size: 15px;
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: stretch;
		padding: 0;
		overflow: hidden;
		font-family: var(--font-family);
	}

	.profiler-toggle-graph {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
		background: transparent;
		border: none;
		border-radius: inherit;
		opacity: 0.5;
	}

	.profiler-toggle.toggle-left {
		right: auto;
		left: 15px;
		border-radius: 6px 12px 12px 6px;
		flex-direction: row-reverse;
	}

	.profiler-toggle.toggle-left .builtin-tabs-container {
		border-right: none;
		border-left: 1px solid #262636;
	}

	.profiler-toggle:hover {
		border-color: var(--color-accent);
	}

	.profiler-toggle.panel-open .toggle-icon {
		background-color: rgba(0, 170, 255, 0.2);
		color: var(--color-accent);
	}

	.toggle-icon {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		font-size: 20px;
		transition: background-color 0.2s;
	}

	.console-badge-container {
		position: absolute;
		top: 2px;
		right: 2px;
		display: flex;
		gap: 2px;
		pointer-events: none;
	}

	.console-badge,
	.tab-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 14px;
		height: 14px;
		padding: 0 4px;
		border-radius: 7px;
		font-size: 9px;
		font-weight: bold;
		color: #ffffff;
		line-height: 1;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.tab-badge-container {
		position: absolute;
		top: 1px;
		right: 3px;
		display: flex;
		gap: 2px;
		pointer-events: none;
	}

	.console-badge.error,
	.tab-badge.error {
		background-color: var(--color-red);
	}

	.console-badge.warn,
	.tab-badge.warn {
		background-color: var(--color-yellow);
		color: #111111;
	}

	.profiler-toggle:hover .toggle-icon {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.profiler-toggle.panel-open:hover .toggle-icon {
		background-color: rgba(0, 170, 255, 0.3);
	}

	.toggle-separator {
		width: 1px;
		background-color: var(--profiler-border);
	}

	.toggle-text {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: baseline;
		padding: 8px 14px;
		min-width: 80px;
		justify-content: right;
	}

	.toggle-text .fps-label {
		font-size: 0.7em;
		margin-left: 10px;
		color: #999;
	}

	.builtin-tabs-container {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: stretch;
		gap: 0;
		border-right: 1px solid #262636;
		order: -1;
	}

	.builtin-tab-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 8px 14px;
		font-family: var(--font-family);
		font-size: 13px;
		font-weight: 600;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 32px;
		position: relative;
	}

	.builtin-tab-btn svg {
		width: 20px;
		height: 20px;
		stroke: currentColor;
	}

	.builtin-tab-btn:hover {
		background-color: rgba(255, 255, 255, 0.08);
		color: var(--color-accent);
	}

	.builtin-tab-btn:active {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.builtin-tab-btn.active {
		background-color: rgba(0, 170, 255, 0.2);
		color: var(--color-accent);
	}

	.builtin-tab-btn.active:hover {
		background-color: rgba(0, 170, 255, 0.3);
	}

	.profiler-mini-panel {
		position: absolute;
		top: 60px;
		right: 15px;
		background-color: rgba(30, 30, 36, 0.85);
		border: 1px solid #4a4a5a54;
		border-radius: 8px;
		color: var(--text-primary);
		z-index: 9999;
		backdrop-filter: blur(8px);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
		font-family: var(--font-family);
		font-size: 11px;
		width: 350px;
		max-width: calc(100vw - 30px);
		min-width: 170px;
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		overflow-x: hidden;
		display: none;
		opacity: 0;
		transform: translateY(-10px) scale(0.98);
		transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), 
					transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.profiler-mini-panel.toggle-left {
		right: auto;
		left: 15px;
	}

	.profiler-mini-panel.visible {
		display: block;
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.profiler-toggle.toggle-bottom {
		top: auto;
		bottom: 15px;
	}

	.profiler-mini-panel.toggle-bottom {
		top: auto;
		bottom: 60px;
	}

	.profiler-mini-panel::-webkit-scrollbar {
		width: 6px;
	}

	.profiler-mini-panel::-webkit-scrollbar-track {
		background: transparent;
	}

	.profiler-mini-panel::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.15);
		border-radius: 3px;
		transition: background 0.2s;
	}

	.profiler-mini-panel::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.mini-panel-content {
		padding: 0;
		font-size: 11px;
		line-height: 1.5;
		font-family: var(--font-mono);
		letter-spacing: 0.3px;
		user-select: none;
		-webkit-user-select: none;
	}

	.mini-panel-content .profiler-content {
		display: block !important;
		background: transparent;
	}

	.mini-panel-content .list-scroll-wrapper {
		max-height: calc(100vh - 120px);
		overflow-y: auto;
		overflow-x: hidden;
		width: 100%;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar {
		width: 4px;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar-track {
		background: transparent;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}

	.mini-panel-content .list-scroll-wrapper::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.mini-panel-content .parameters {
		background: transparent;
		border: none;
		box-shadow: none;
		padding: 4px;
	}

	@media screen and (max-width: 340px) {

		.mini-panel-content .parameters {
			min-width: 0 !important;
		}

		.mini-panel-content .list-container.parameters .list-item-row,
		.mini-panel-content .list-container.parameters .list-header {
			grid-template-columns: minmax(0, .5fr) minmax(0, 1fr) !important;
		}

	}

	.mini-panel-content .list-container.parameters {
		padding: 2px 6px 0px 6px !important;
	}

	.mini-panel-content .list-header {
		display: none;
		padding: 2px 4px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.mini-panel-content .list-item {
		border-bottom: 1px solid rgba(74, 74, 90, 0.2);
		transition: background-color 0.15s;
	}

	.mini-panel-content .list-item:last-child {
		border-bottom: none;
	}

	.mini-panel-content .list-item:hover {
		background-color: rgba(255, 255, 255, 0.04);
	}

	.mini-panel-content .list-item.actionable:hover {
		background-color: rgba(255, 255, 255, 0.06);
		cursor: pointer;
	}

	.info-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--text-secondary);
		font-size: 10px;
		font-style: italic;
		margin-left: 6px;
		cursor: help;
		position: relative;
		vertical-align: middle;
		top: -1px;
	}

	.info-icon.active {
		background-color: var(--color-accent);
		color: white;
	}

	@media (hover: hover) {
		.info-icon:hover {
			background-color: var(--color-accent);
			color: white;
		}
	}

	.info-tooltip {
		position: fixed;
		transform: translate(-50%, -100%);
		background-color: rgba(30, 30, 36, 0.95);
		border: 1px solid var(--profiler-border);
		border-radius: 6px;
		padding: 10px 14px;
		color: var(--text-primary);
		font-size: 12px;
		width: max-content;
		max-width: 250px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.2s, visibility 0.2s;
		z-index: 999999;
		font-style: normal;
		font-family: var(--font-family);
		text-align: left;
		white-space: normal;
	}

	.info-tooltip h3 {
		margin: 0 0 6px 0;
		font-size: 13px;
		color: var(--color-accent);
	}

	.info-tooltip strong {
		font-weight: 600;
		color: white;
	}

	/* Style adjustments for lil-gui look */
	.mini-panel-content .item-row {
		padding: 3px 8px;
		min-height: 24px;
	}

	.mini-panel-content .list-item-row {
		padding: 1px 4px;
		gap: 8px;
		min-height: 21px;
		align-items: center;
	}

	.mini-panel-content input[type="checkbox"] {
		width: 12px;
		height: 12px;
	}

	.mini-panel-content input[type="range"] {
		height: 18px;
	}

	.mini-panel-content .value-number input,
	.mini-panel-content .value-slider input {
		background-color: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(74, 74, 90, 0.5);
		font-size: 10px;
	}

	.mini-panel-content .value-number input:focus,
	.mini-panel-content .value-slider input:focus {
		border-color: var(--color-accent);
	}

	.mini-panel-content .value-slider {
		gap: 6px;
	}

	/* Compact nested items */
	.mini-panel-content .list-item .list-item {
		margin-left: 8px;
	}

	.mini-panel-content .list-item .list-item .item-row,
	.mini-panel-content .list-item .list-item .list-item-row {
		padding: 2px 6px;
		min-height: 22px;
	}

	/* Compact collapsible headers */
	.mini-panel-content .collapsible .item-row,
	.mini-panel-content .list-item-row.collapsible {
		padding: 2px 8px;
		font-weight: 600;
		min-height: 16px;
		display: flex;
		align-items: center;
		line-height: 1;
	}

	.mini-panel-content .collapsible-icon {
		font-size: 10px;
		width: 14px;
		height: 14px;
	}

	.mini-panel-content .param-control input[type="range"] {
		height: 12px;
		margin-top: 1px;
		padding-top: 5px;
		user-select: none;
		-webkit-user-select: none;
		outline: none;
	}

	.mini-panel-content .param-control input[type="range"]::-webkit-slider-thumb {
		width: 14px;
		height: 14px;
		margin-top: -5px;
		user-select: none;
		-webkit-user-select: none;
	}

	.mini-panel-content .param-control input[type="range"]::-moz-range-thumb {
		width: 14px;
		height: 14px;
		user-select: none;
		-moz-user-select: none;
	}

	.mini-panel-content .list-children-container {
		padding-left: 0;
	}

	.mini-panel-content .param-control input[type="number"] {
		flex-basis: 60px !important;
	}

	.mini-panel-content .param-control {
		align-items: center;
	}

	.mini-panel-content .param-control select {
		font-size: 11px;
	}

	.mini-panel-content .list-item-wrapper {
		margin-top: 0;
		margin-bottom: 0;
	}

	.profiler-panel {
		position: absolute;
		z-index: 1001 !important;
		bottom: 0;
		left: 0;
		right: 0;
		height: 350px;
		background-color: var(--profiler-background);
		backdrop-filter: blur(8px);
		border-top: 2px solid var(--profiler-border);
		color: var(--text-primary);
		display: flex;
		flex-direction: column;
		z-index: 1000;
		/*box-shadow: 0 -5px 25px rgba(0, 0, 0, 0.5);*/
		transform: translateY(100%);
		transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s ease-out, width 0.3s ease-out;
		font-family: var(--font-mono);
	}

	.profiler-panel.resizing,
	.profiler-panel.dragging {
		transition: none;
	}

	.profiler-panel.visible {
		transform: translateY(0);
	}

	.profiler-panel.maximized {
		height: 100%;
		z-index: 10000 !important;
	}

	/* Position-specific styles */
	.profiler-panel.position-top {
		bottom: auto;
		top: 0;
		border-top: none;
		border-bottom: 2px solid var(--profiler-border);
		transform: translateY(-100%);
	}

	.profiler-panel.position-top.visible {
		transform: translateY(0);
	}

	.profiler-panel.position-bottom {
		/* Default position - already defined above */
	}

	.profiler-panel.position-left {
		top: 0;
		bottom: 0;
		left: 0;
		right: auto;
		width: 350px;
		height: 100%;
		border-top: none;
		border-right: 2px solid var(--profiler-border);
		transform: translateX(-100%);
	}

	.profiler-panel.position-left.visible {
		transform: translateX(0);
	}

	.profiler-panel.position-right {
		top: 0;
		bottom: 0;
		left: auto;
		right: 0;
		width: 350px;
		height: 100%;
		border-top: none;
		border-left: 2px solid var(--profiler-border);
		transform: translateX(100%);
	}

	.profiler-panel.position-right.visible {
		transform: translateX(0);
	}

	.profiler-panel.position-floating {
		border: 2px solid var(--profiler-border);
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		transform: none !important;
		overflow: hidden;
	}

	.profiler-panel.position-floating.visible {
		transform: none !important;
	}

	.profiler-panel.position-floating .profiler-header {
		border-radius: 6px 6px 0 0;
	}

	.profiler-panel.position-floating .panel-resizer {
		bottom: 0;
		right: 0;
		top: auto;
		left: auto;
		width: 16px;
		height: 16px;
		cursor: nwse-resize;
		border-radius: 0 0 6px 0;
	}

	.profiler-panel.position-floating .panel-resizer::after {
		content: '';
		position: absolute;
		right: 2px;
		bottom: 2px;
		width: 10px;
		height: 10px;
		background: linear-gradient(135deg, transparent 0%, transparent 45%, var(--profiler-border) 45%, var(--profiler-border) 55%, transparent 55%);
	}


	.panel-resizer {
		position: absolute;
		top: -2px;
		left: 0;
		width: 100%;
		height: 5px;
		cursor: ns-resize;
		z-index: 1001;
		touch-action: none;
	}

	.profiler-panel.position-top .panel-resizer {
		top: auto;
		bottom: -2px;
	}

	.profiler-panel.position-left .panel-resizer {
		top: 0;
		left: auto;
		right: -2px;
		width: 5px;
		height: 100%;
		cursor: ew-resize;
	}

	.profiler-panel.position-right .panel-resizer {
		top: 0;
		left: -2px;
		right: auto;
		width: 5px;
		height: 100%;
		cursor: ew-resize;
	}

	.profiler-header {
		display: flex;
		background-color: var(--profiler-header-background);
		border-bottom: 1px solid var(--profiler-border);
		flex-shrink: 0;
		justify-content: space-between;
		align-items: stretch;

		overflow-x: auto;
		overflow-y: hidden;
		width: calc(100% - 120px);
		height: 32px;
		user-select: none;
		-webkit-user-select: none;
	}

	.profiler-panel.has-horizontal-scroll .profiler-header {
		height: 38px;
	}

	/* Adjust header width based on panel position */
	.profiler-panel.position-right .profiler-header,
	.profiler-panel.position-left .profiler-header {
		width: calc(100% - 120px);
	}

	.profiler-panel.position-bottom .profiler-header,
	.profiler-panel.position-top .profiler-header {
		width: calc(100% - 120px);
	}

	/* Adjust header width when position toggle button is hidden (mobile) */
	.profiler-panel.hide-position-toggle .profiler-header {
		width: calc(100% - 80px);
	}

	/* Adjust header width when maximized (floating position toggle button is hidden) */
	.profiler-panel.maximized .profiler-header {
		width: calc(100% - 80px);
	}

	/* ===== RULES FOR WHEN THERE ARE NO TABS ===== */

	/* Horizontal mode (bottom/top) without tabs */
	.profiler-panel.position-bottom.no-tabs:not(.maximized),
	.profiler-panel.position-top.no-tabs:not(.maximized) {
		height: 32px !important;
		min-height: 32px !important;
	}

	.profiler-panel.position-bottom.no-tabs .profiler-header,
	.profiler-panel.position-top.no-tabs .profiler-header {
		width: 100%;
		height: 32px;
		border-bottom: none;
	}

	.profiler-panel.position-bottom.no-tabs .profiler-content-wrapper,
	.profiler-panel.position-top.no-tabs .profiler-content-wrapper {
		display: none;
	}

	.profiler-panel.position-bottom.no-tabs .panel-resizer,
	.profiler-panel.position-top.no-tabs .panel-resizer {
		display: none;
	}

	/* Vertical mode (right/left) without tabs */
	.profiler-panel.position-right.no-tabs:not(.maximized),
	.profiler-panel.position-left.no-tabs:not(.maximized) {
		width: 40px !important;
		min-width: 40px !important;
	}

	/* Vertical layout for header when no tabs */
	.profiler-panel.position-right.no-tabs .profiler-header,
	.profiler-panel.position-left.no-tabs .profiler-header {
		width: 100%;
		flex-direction: column;
		height: 100%;
		border-bottom: none;
	}

	/* Vertical layout for controls when no tabs */
	.profiler-panel.position-right.no-tabs .profiler-controls,
	.profiler-panel.position-left.no-tabs .profiler-controls {
		position: static;
		flex-direction: column-reverse;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
		border-bottom: none;
		border-left: none;
		background: transparent;
	}

	.profiler-panel.position-right.no-tabs .profiler-controls button,
	.profiler-panel.position-left.no-tabs .profiler-controls button {
		width: 100%;
		height: 40px;
		border-left: none;
		border-top: none;
		border-bottom: 1px solid var(--profiler-border);
	}

	.profiler-panel.position-right.no-tabs .profiler-content-wrapper,
	.profiler-panel.position-left.no-tabs .profiler-content-wrapper {
		display: none;
	}

	.profiler-panel.position-right.no-tabs .profiler-tabs,
	.profiler-panel.position-left.no-tabs .profiler-tabs {
		display: none;
		padding-left: 2px;
	}

	.profiler-panel.position-right.no-tabs .panel-resizer,
	.profiler-panel.position-left.no-tabs .panel-resizer {
		display: none;
	}

	/* Hide position toggle on mobile without tabs */
	.profiler-panel.hide-position-toggle.position-right.no-tabs:not(.maximized),
	.profiler-panel.hide-position-toggle.position-left.no-tabs:not(.maximized) {
		width: 40px !important;
		min-width: 40px !important;
	}

	/* Hide drag indicator on mobile devices */
	.profiler-panel.is-mobile .tab-btn.active::before {
		display: none;
	}

	.profiler-header::-webkit-scrollbar,
	.profiler-tabs::-webkit-scrollbar,
	.profiler-content::-webkit-scrollbar,
	.detached-tab-content::-webkit-scrollbar,
	.console-log::-webkit-scrollbar,
	.timelineTrack::-webkit-scrollbar,
	.list-scroll-wrapper::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	.profiler-header::-webkit-scrollbar-track,
	.profiler-tabs::-webkit-scrollbar-track,
	.profiler-content::-webkit-scrollbar-track,
	.detached-tab-content::-webkit-scrollbar-track,
	.console-log::-webkit-scrollbar-track,
	.timelineTrack::-webkit-scrollbar-track,
	.list-scroll-wrapper::-webkit-scrollbar-track {
		background: transparent;
	}

	.profiler-header::-webkit-scrollbar-thumb,
	.profiler-tabs::-webkit-scrollbar-thumb,
	.profiler-content::-webkit-scrollbar-thumb,
	.detached-tab-content::-webkit-scrollbar-thumb,
	.console-log::-webkit-scrollbar-thumb,
	.timelineTrack::-webkit-scrollbar-thumb,
	.list-scroll-wrapper::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.15);
		border-radius: 2px;
	}

	.profiler-header::-webkit-scrollbar-thumb:hover,
	.profiler-tabs::-webkit-scrollbar-thumb:hover,
	.profiler-content::-webkit-scrollbar-thumb:hover,
	.detached-tab-content::-webkit-scrollbar-thumb:hover,
	.console-log::-webkit-scrollbar-thumb:hover,
	.timelineTrack::-webkit-scrollbar-thumb:hover,
	.list-scroll-wrapper::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.profiler-header::-webkit-scrollbar-corner,
	.profiler-tabs::-webkit-scrollbar-corner,
	.profiler-content::-webkit-scrollbar-corner,
	.detached-tab-content::-webkit-scrollbar-corner,
	.console-log::-webkit-scrollbar-corner,
	.timelineTrack::-webkit-scrollbar-corner,
	.list-scroll-wrapper::-webkit-scrollbar-corner {
		background: transparent;
	}

	.profiler-header,
	.profiler-tabs,
	.profiler-content,
	.detached-tab-content,
	.console-log,
	.timelineTrack,
	.list-scroll-wrapper {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
	}

	.profiler-panel.dragging .profiler-header {
		cursor: grabbing !important;
	}

	.profiler-panel.dragging {
		opacity: 0.8;
	}

	.profiler-tabs {
		display: flex;
		cursor: grab;
		position: relative;
		margin-left: 2px;
	}

	.profiler-tabs:active {
		cursor: grabbing;
	}


	.profiler-controls {
		display: flex;
		position: absolute;
		right: 0;
		top: 0;
		height: 32px;
		background: var(--profiler-header-background);
		border-bottom: 1px solid var(--profiler-border);
	}

	.profiler-panel.has-horizontal-scroll .profiler-controls {
		height: 38px;
	}

	.tab-btn {
		position: relative;
		background: transparent;
		border: none;
		/*border-right: 1px solid var(--profiler-border);*/
		color: var(--text-secondary);
		padding: 0 15px 2px 15px;
		height: 100%;
		box-sizing: border-box;
		cursor: default;
		display: flex;
		align-items: center;
		font-family: var(--font-family);
		font-weight: 600;
		font-size: 13px;
		user-select: none;
		transition: opacity 0.2s, transform 0.2s;
		touch-action: pan-x;
		white-space: nowrap;
	}

	.tab-btn.active {
		border-bottom: 2px solid var(--color-accent);
		color: white;
	}

	.tab-btn.active::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 50%;
		transform: translateY(-50%);
		width: 8px;
		height: 14px;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='3' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='2' cy='7' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='2' cy='11' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='6' cy='3' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='6' cy='7' r='1' fill='%234a4a5a'/%3E%3Ccircle cx='6' cy='11' r='1' fill='%234a4a5a'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.6;
	}

	.tab-btn.no-detach.active::before {
		display: none;
	}

	.floating-btn,
	.maximize-btn,
	.hide-panel-btn {
		background: transparent;
		border: none;
		border-left: 1px solid var(--profiler-border);
		color: var(--text-secondary);
		width: 40px;
		height: 100%;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* Disable transitions in vertical mode to avoid broken animations */
	.profiler-panel.position-right .floating-btn,
	.profiler-panel.position-right .maximize-btn,
	.profiler-panel.position-right .hide-panel-btn,
	.profiler-panel.position-left .floating-btn,
	.profiler-panel.position-left .maximize-btn,
	.profiler-panel.position-left .hide-panel-btn {
		transition: background-color 0.2s, color 0.2s;
	}

	.floating-btn:hover,
	.maximize-btn:hover,
	.hide-panel-btn:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--text-primary);
	}

	/* Hide maximize button when there are no tabs */
	.profiler-panel.position-right.no-tabs .maximize-btn,
	.profiler-panel.position-left.no-tabs .maximize-btn,
	.profiler-panel.position-bottom.no-tabs .maximize-btn,
	.profiler-panel.position-top.no-tabs .maximize-btn {
		display: none !important;
	}

	/* Hide floating button when maximized */
	.profiler-panel.maximized .floating-btn {
		display: none !important;
	}

	.profiler-content-wrapper {
		flex-grow: 1;
		overflow: hidden;
		position: relative;
	}

	.profiler-content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		font-size: 13px;
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.2s, visibility 0.2s;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		user-select: none;
		-webkit-user-select: none;
	}

	.profiler-content.active {
		visibility: visible;
		opacity: 1;
	}

	.profiler-content {
		overflow: auto; /* make sure scrollbars can appear */
	}


	.list-item-row {
		display: grid;
		grid-template-columns: var(--list-grid-template, none);
		align-items: center;
		padding: 4px 8px;
		border-radius: 3px;
		transition: background-color 0.2s;
		gap: 10px;
		border-bottom: none;
		user-select: none;
		-webkit-user-select: none;
	}

	.parameters .list-item-row {
		min-height: 23px;
	}

	.mini-panel-content .parameters .list-item-row {
		min-height: 21px;
	}

	.list-item-wrapper {
		margin-top: 2px;
		margin-bottom: 2px;
		user-select: none;
		-webkit-user-select: none;
	}

	.list-item-wrapper:has(> .list-item-row .graph-container) {
		margin-left: -1.5em;
	}

	.list-item-wrapper:first-child {
		/*margin-top: 0;*/
	}

	.list-item-wrapper:not(.header-wrapper):nth-child(odd) > .list-item-row {
		background-color: rgba(0,0,0,0.1);
	}

	.list-item-wrapper.header-wrapper>.list-item-row {
		color: var(--color-accent);
		background-color: rgba(0, 170, 255, 0.1);
	}

	.list-item-wrapper.header-wrapper>.list-item-row>.list-item-cell:first-child {
		font-weight: 600;
	}

	.list-item-row.collapsible,
	.list-item-row.actionable {
		cursor: pointer;
	}

	.list-item-row.collapsible {
		background-color: rgba(0, 170, 255, 0.15) !important;
		min-height: 23px;
	}

	.list-item-row.collapsible.alert,
	.list-item-row.alert {
		background-color: rgba(244, 67, 54, 0.1) !important;
	}

	@media (hover: hover) {

		.list-item-row:hover:not(.collapsible):not(.no-hover),
		.list-item-row:hover:not(.no-hover),
		.list-item-row.actionable:hover,
		.list-item-row.collapsible.actionable:hover {
			background-color: rgba(255, 255, 255, 0.05) !important;
		}

		.list-item-row.collapsible:hover {
			background-color: rgba(0, 170, 255, 0.25) !important;
		}

	}

	.list-item-cell {
		white-space: pre;
		display: flex;
		align-items: center;
		user-select: none;
		-webkit-user-select: none;
	}

	.list-item-cell:not(:first-child) {
		justify-content: flex-end;
		font-weight: 600;
	}

	.list-header {
		display: grid;
		grid-template-columns: var(--list-grid-template, none);
		align-items: center;
		padding: 4px 8px;
		font-weight: 600;
		color: var(--text-secondary);
		padding-bottom: 6px;
		border-bottom: 1px solid var(--profiler-border);
		margin-bottom: 5px;
		gap: 10px;
		user-select: none;
		-webkit-user-select: none;
	}

	.list-item-wrapper.section-start {
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.list-header .list-header-cell:not(:first-child) {
		text-align: right;
	}

	.list-children-container {
		padding-left: 1.5em;
		overflow: hidden;
		transition: max-height 0.1s ease-out;
		margin-top: 2px;
	}

	.list-children-container.closed {
		max-height: 0;
		display: none !important;
	}

	.item-toggler {
		display: inline-block;
		margin-right: 0.8em;
		text-align: left;
	}

	.list-item-row.open .item-toggler::before {
		content: '-';
	}

	.list-item-row:not(.open) .item-toggler::before {
		content: '+';
	}

	.list-item-cell .value.good {
		color: var(--color-green);
	}

	.list-item-cell .value.warn {
		color: var(--color-yellow);
	}

	.list-item-cell .value.bad {
		color: var(--color-red);
	}

	.list-scroll-wrapper {
		width: max-content;
		min-width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.list-container.parameters .list-item-row:not(.collapsible) {
	}

	.graph-container {
		width: 100%;
		box-sizing: border-box;
		padding: 8px 0;
		position: relative;
	}

	.graph-svg, .graph-canvas {
		width: 0;
		min-width: 100%;
		height: 80px;
		background-color: var(--profiler-header);
		border: 1px solid var(--profiler-border);
		border-radius: 4px;
		display: block;
	}

	.graph-path {
		stroke-width: 2;
		fill-opacity: 0.4;
	}

	.console-buttons-group {
		display: flex;
		gap: 20px;
	}

	.console-filter-input {
		background-color: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px 10px 2px 10px;
		font-family: var(--font-mono);
		flex-grow: 1;
		max-width: 300px;
		border-radius: 15px;
	}

	.console-filter-input:focus {
		outline: none;
		border-color: var(--text-secondary);
	}

	.console-copy-button {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: color 0.2s, background-color 0.2s;
	}

	.console-copy-button:hover {
		color: var(--text-primary);
		background-color: var(--profiler-hover);
	}

	.console-copy-button.copied {
		color: var(--color-green);
	}

	.console-log {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px;
		overflow-y: auto;
		flex-grow: 1;
		user-select: text;
		-webkit-user-select: text;
	}

	.log-message {
		display: flex;
		align-items: flex-start;
		gap: 6px;
		padding: 3px 5px;
		border-radius: 3px;
		line-height: 1.5 !important;
	}

	.log-count-badge {
		display: inline-block;
		text-align: center;
		min-width: 14px;
		height: 14px;
		border-radius: 7px;
		padding: 0 3px;
		font-size: 9px;
		font-weight: bold;
		line-height: 14px;
		box-sizing: border-box;
		margin-top: 0;
		flex-shrink: 0;
	}

	.log-icon {
		display: inline-block;
		text-align: center;
		width: 14px;
		height: 14px;
		font-size: 11px;
		line-height: 14px;
		margin-top: 0;
		flex-shrink: 0;
	}

	.log-body {
		flex-grow: 1;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.log-message.info .log-count-badge {
		background-color: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: var(--text-secondary);
	}

	.log-message.warn .log-count-badge {
		background-color: rgba(255, 193, 7, 0.18);
		border: 1px solid rgba(255, 193, 7, 0.35);
		color: var(--color-yellow);
	}

	.log-message.error .log-count-badge {
		background-color: rgba(244, 67, 54, 0.18);
		border: 1px solid rgba(244, 67, 54, 0.35);
		color: #ff8a80;
	}

	.log-message.hidden {
		display: none;
	}

	.log-message.info {
		color: var(--text-primary);
	}

	.log-message.warn {
		color: var(--color-yellow);
	}

	.log-message.error {
		color: #f9dedc;
		background-color: rgba(244, 67, 54, 0.1);
	}

	.log-prefix {
		color: var(--text-secondary);
		margin-right: 8px;
	}

	.log-code {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		padding: 1px 4px;
	}

	.thumbnail-container {
		display: flex;
		align-items: center;
	}

	.thumbnail-svg {
		width: 40px;
		height: 22.5px;
		flex-shrink: 0;
		margin-right: 8px;
	}

	.param-control {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 10px;
		width: 100%;
	}

	.param-control input,
	.param-control select,
	.param-control button {
		background-color: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px 6px;
		padding-bottom: 2px;
		font-family: var(--font-mono);
		width: 100%;
		box-sizing: border-box;
		color-scheme: dark;
	}

	.param-control input:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	.param-control select {
		padding-top: 3px;
		padding-bottom: 1px;
	}

	.param-control input[type="number"] {
		cursor: ns-resize;
	}

	.param-control input[type="color"] {
		padding: 2px;
	}

	.param-control button {
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.param-control button:hover {
		background-color: var(--profiler-header);
	}

	.param-control-vector {
		display: flex;
		gap: 5px;
	}

	.custom-checkbox {
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		gap: 8px;
		will-change: transform;
		font-size: 12px;
	}

	.custom-checkbox input {
		display: none;
	}

	.custom-checkbox .checkmark {
		width: 14px;
		height: 14px;
		border: 1px solid var(--color-accent);
		border-radius: 3px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition: background-color 0.2s, border-color 0.2s;
	}

	.custom-checkbox .checkbox-text {
		font-size: 12px;
		margin-top: 1px;
		color: inherit;
	}

	.custom-checkbox .checkmark::after {
		content: '';
		width: 6px;
		height: 6px;
		background-color: var(--color-accent);
		border-radius: 1px;
		display: block;
		transform: scale(0);
		transition: transform 0.2s;
	}

	.list-container .custom-checkbox .checkmark {
		width: 13px;
		height: 13px;
	}

	.list-container .custom-checkbox .checkmark::after {
		width: 7px;
		height: 7px;
	}

	.custom-checkbox input:checked+.checkmark {
		border-color: var(--color-accent);
	}

	.custom-checkbox input:checked+.checkmark::after {
		transform: scale(1);
	}

	.param-control input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 16px;
		background: var(--profiler-header);
		border-radius: 5px;
		border: 1px solid var(--profiler-border);
		outline: none;
		padding: 0px;
		padding-top: 8px;
	}

	.param-control input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		background: var(--profiler-background);
		border: 1px solid var(--color-accent);
		border-radius: 3px;
		cursor: pointer;
		margin-top: -8px;
	}

	.param-control input[type="range"]::-moz-range-thumb {
		width: 18px;
		height: 18px;
		background: var(--profiler-background);
		border: 2px solid var(--color-accent);
		border-radius: 3px;
		cursor: pointer;
	}

	.param-control input[type="range"]::-moz-range-track {
		width: 100%;
		height: 16px;
		background: var(--profiler-header);
		border-radius: 5px;
		border: 1px solid var(--profiler-border);
	}

	/* Override .param-control styles for mini-panel-content */
	.mini-panel-content input,
	.mini-panel-content select,
	.mini-panel-content button {
		padding: 2px 4px;
		height: 21px;
		line-height: 1.4;
		padding-top: 4px;
	}

	.mini-panel-content .param-control input,
	.mini-panel-content .param-control select,
	.mini-panel-content .param-control button {
		background-color: #1e1e24c2;
		line-height: 1.0;
	}

	.mini-panel-content .param-control select {
		padding: 2px 2px;
		padding-top: 3px;
	}

	.mini-panel-content .param-control input[type="number"]::-webkit-outer-spin-button,
	.mini-panel-content .param-control input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.mini-panel-content .param-control input[type="number"] {
		-moz-appearance: textfield;
	}

	.mini-panel-content .list-item-cell span {
		position: relative;
		top: 1px;
		margin-left: 2px;
	}

	@media screen and (max-width: 340px) {

		.mini-panel-content .list-item-cell:first-child {
			display: flex;
			align-items: center;
			min-width: 0;
			overflow: hidden;
			width: 100%;
		}

		.mini-panel-content .list-item-cell:first-child .value {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			flex: 1 1 0%;
			min-width: 0;
		}

		.mini-panel-content .list-item-cell:first-child .info-icon {
			flex-shrink: 0;
		}

	}

	.mini-panel-content .custom-checkbox .checkmark {
		width: 12px;
		height: 12px;
		margin-bottom: 2px;
		will-change: transform;
	}

	.mini-panel-content .list-container.parameters .list-item-row:not(.collapsible) {
		margin-bottom: 2px;
	}

	.mini-panel-content .list-container.parameters .list-children-container > .list-item-wrapper:first-child:has(> .list-item-row:not(.collapsible)) {
		margin-top: 2px;
	}

	.mini-panel-content .list-container.parameters .list-children-container > .list-item-wrapper:last-child:has(> .list-item-row:not(.collapsible)) {
		margin-bottom: 4px;
	}

	@media screen and (max-width: 450px) and (orientation: portrait) {

		.console-filter-input {
			max-width: 100px;
		}

	}

	/* Touch device optimizations */
	@media (hover: none) and (pointer: coarse) {

		.panel-resizer {
			top: -10px !important;
			height: 20px !important;
		}

		.profiler-panel.position-top .panel-resizer {
			top: auto !important;
			bottom: -10px !important;
			height: 20px !important;
		}

		.profiler-panel.position-left .panel-resizer {
			right: -10px !important;
			width: 20px !important;
			height: 100% !important;
		}

		.profiler-panel.position-right .panel-resizer {
			left: -10px !important;
			width: 20px !important;
			height: 100% !important;
		}

		.detached-tab-resizer-top,
		.detached-tab-resizer-bottom {
			height: 10px !important;
		}

		.detached-tab-resizer-left,
		.detached-tab-resizer-right {
			width: 10px !important;
		}

	}

	.drag-preview-indicator {
		position: absolute;
		background-color: rgba(0, 170, 255, 0.2);
		border: 2px dashed var(--color-accent);
		z-index: 999;
		pointer-events: none;
		transition: all 0.2s ease-out;
	}

	/* Detached Tab Windows */
	.detached-tab-panel {
		position: absolute;
		width: 500px;
		height: 400px;
		background: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		border-radius: 8px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
		z-index: 1002;
		display: flex;
		flex-direction: column;
		backdrop-filter: blur(10px);
		overflow: hidden;
		opacity: 1;
		visibility: visible;
		transition: opacity 0.2s, visibility 0.2s;
		font-family: var(--font-mono);
		font-size: 13px;
	}


	.detached-tab-header {
		background: var(--profiler-header-background);
		padding: 0 3px 0 10px;
		font-family: var(--font-family);
		font-size: 13px;
		color: var(--text-primary);
		font-weight: 600;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--profiler-border);
		cursor: grab;
		user-select: none;
		height: 32px;
		flex-shrink: 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		touch-action: none;
	}

	.detached-tab-header:active {
		cursor: grabbing;
	}

	.detached-header-controls {
		display: flex;
		gap: 5px;
	}

	.detached-reattach-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		font-family: var(--font-family);
		font-size: 18px;
		line-height: 1;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 4px;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.detached-reattach-btn:hover {
		background: rgba(0, 170, 255, 0.2);
		color: var(--color-accent);
	}

	.detached-tab-content {
		flex: 1;
		overflow: hidden;
		position: relative;
		background: var(--profiler-background);
	}


	.detached-tab-content .profiler-content {
		display: flex !important;
		flex-direction: column !important;
		height: 100%;
		visibility: visible !important;
		opacity: 1 !important;
		position: relative !important;
	}

	.detached-tab-content .profiler-content > * {
		font-family: var(--font-mono);
		color: var(--text-primary);
	}

	.detached-tab-resizer {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 20px;
		height: 20px;
		cursor: nwse-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer::after {
		content: '';
		position: absolute;
		bottom: 2px;
		right: 2px;
		width: 12px;
		height: 12px;
		border-right: 2px solid var(--profiler-border);
		border-bottom: 2px solid var(--profiler-border);
		border-bottom-right-radius: 6px;
		opacity: 0.5;
	}

	.detached-tab-resizer:hover::after {
		opacity: 1;
		border-color: var(--color-accent);
	}

	/* Edge resizers */
	.detached-tab-resizer-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		cursor: ns-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer-right {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 5px;
		cursor: ew-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5px;
		cursor: ns-resize;
		z-index: 10;
		touch-action: none;
	}

	.detached-tab-resizer-left {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 5px;
		cursor: ew-resize;
		z-index: 10;
		touch-action: none;
	}

	/* Input number spin buttons - hide arrows */
	/* Chrome, Safari, Edge, Opera */
	.profiler-panel input[type="number"]::-webkit-outer-spin-button,
	.profiler-panel input[type="number"]::-webkit-inner-spin-button,
	.detached-tab-content input[type="number"]::-webkit-outer-spin-button,
	.detached-tab-content input[type="number"]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	.profiler-panel input[type="number"],
	.detached-tab-content input[type="number"] {
		-moz-appearance: textfield;
	}

	.panel-action-btn {
		background: transparent;
		color: var(--text-primary);
		border: 1px solid var(--profiler-border);
		border-radius: 4px;
		padding: 6px 12px;
		cursor: pointer;
		font-family: var(--font-family);
		font-size: 12px;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel-action-btn:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.node-canvas-wrapper {
		touch-action: none;
	}

	.node-canvas-wrapper .node-canvas-detach-btn {
		position: absolute;
		top: 5px;
		right: 5px;
		background: rgba(30, 30, 36, 0.85);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;
		opacity: 1;
		transition: background-color 0.2s, border-color 0.2s, color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.node-canvas-wrapper .node-canvas-detach-btn:hover {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.node-canvas-wrapper .node-canvas-fullscreen-btn {
		position: absolute;
		bottom: 5px;
		right: 5px;
		background: rgba(30, 30, 36, 0.85);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;
		opacity: 1;
		transition: background-color 0.2s, border-color 0.2s, color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.node-canvas-wrapper .node-canvas-fullscreen-btn:hover {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.profiler-panel.maximized .node-canvas-fullscreen-btn {
		display: none;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 32px;
		padding: 4px 6px;
		border-bottom: 1px solid var(--profiler-border);
		background: var(--profiler-header-background);
		flex-shrink: 0;
		box-sizing: border-box;
		gap: 16px;
	}

	.toolbar span {
		color: var(--text-secondary);
		font-size: 12px;
		font-weight: 600;
	}

	.toolbar .custom-checkbox .checkmark {
		width: 12px;
		height: 12px;
		border-radius: 4px;
	}

	.viewer-content .toolbar {
		justify-content: flex-end;
	}

	.viewer-back-btn {
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		font-size: 16px;
		line-height: 1;
		padding: 4px 8px;
		border-radius: 4px;
		margin-right: auto;
		transition: color 0.2s, background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.viewer-back-btn:hover {
		color: var(--text-primary);
		background-color: rgba(255, 255, 255, 0.05);
	}

	select {
		color-scheme: dark;
	}

	select option,
	option {
		background-color: #1e1e24;
		color: var(--text-primary);
	}

	.select {
		background: var(--profiler-background);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px 16px 2px 6px;
		font-family: var(--font-mono);
		font-size: 12px;
		outline: none;
		cursor: pointer;
		color-scheme: dark;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 5px center;
		background-size: 10px;
	}

	.select:focus {
		border-color: var(--color-accent);
	}

	.full-viewer-container {
		display: none;
		flex-grow: 1;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		touch-action: none;
	}

	.node-canvas-wrapper .node-canvas-split-btn {
		position: absolute;
		top: 5px;
		left: 5px;
		background: rgba(30, 30, 36, 0.85);
		border: 1px solid var(--profiler-border);
		color: var(--text-primary);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;
		opacity: 1;
		transition: background-color 0.2s, border-color 0.2s, color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.node-canvas-wrapper .node-canvas-split-btn:hover {
		background-color: var(--color-accent);
		border-color: var(--color-accent);
		color: white;
	}

	.node-canvas-wrapper .node-canvas-split-btn.active,
	.node-canvas-wrapper .node-canvas-fullscreen-btn.active {
		background-color: var(--color-accent) !important;
		border-color: var(--color-accent) !important;
		color: white !important;
	}

	.split-screen-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none !important;
		z-index: 999;
		touch-action: none;
		overflow: hidden;
	}

	.split-screen-line {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 1px;
		left: 50%;
		background-color: transparent;
		cursor: ew-resize;
		pointer-events: auto !important;
		z-index: 10;
		touch-action: none;
		transition: background-color 0.15s ease-out;
	}

	.split-screen-line:hover,
	.split-screen-line:active,
	.split-screen-line.active {
		background-color: var(--color-accent);
	}

	.split-screen-line::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -12px;
		width: 25px;
		background: transparent;
		cursor: ew-resize;
	}

	.split-screen-line::after {
		content: '';
		position: absolute;
		top: -1px;
		bottom: -1px;
		left: -5px;
		width: 11px;
		pointer-events: none;
		background-image:
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 -1 L5.5 7 L11.5 -1 Z' fill='rgba(30,30,36,0.85)' stroke='%234a4a5a' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E"),
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 8 L5.5 0 L11.5 8 Z' fill='rgba(30,30,36,0.85)' stroke='%234a4a5a' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-position: top center, bottom center;
		background-repeat: no-repeat;
		opacity: 1;
		transition: opacity 0.15s ease-out;
	}

	.split-screen-line:hover::after,
	.split-screen-line:active::after,
	.split-screen-line.active::after {
		opacity: 1;
		background-image:
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 -1 L5.5 7 L11.5 -1 Z' fill='%2300aaff' stroke='%2300aaff' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E"),
			url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M-0.5 8 L5.5 0 L11.5 8 Z' fill='%2300aaff' stroke='%2300aaff' stroke-width='1' stroke-linejoin='round'/%3E%3C/svg%3E");
	}

	/* Grid Mode styles for List component */
	.list-scroll-wrapper:has(> .list-container.grid-mode) {
		width: 100% !important;
	}

	.list-container.grid-mode {
		min-width: 0 !important;
		width: 100% !important;
		box-sizing: border-box;
	}

	.list-container.grid-mode .list-header {
		display: none !important;
	}

	.list-container.grid-mode .list-children-container {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding-left: 0 !important;
		margin-top: 10px;
		margin-bottom: 15px;
		width: 100%;
		box-sizing: border-box;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper {
		display: inline-block;
		width: 160px;
		margin: 0;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper > .list-item-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		/*background-color: var(--profiler-header);
		border: 1px solid var(--profiler-border);*/
		border-radius: 6px;
		padding: 8px;
		gap: 8px;
		width: 100%;
		box-sizing: border-box;
		grid-template-columns: none !important;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper > .list-item-row > .list-item-cell:first-child {
		width: 140px;
		height: 140px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
	}

	.list-container.grid-mode .list-children-container > .list-item-wrapper > .list-item-row > .list-item-cell:not(:first-child) {
		width: 100%;
		text-align: center !important;
		font-size: 11px;
		font-weight: 500;
		color: var(--text-primary);
		white-space: normal;
		word-break: break-all;
		justify-content: center !important;
	}

	/* Timeline Info & Details */
	.timeline-detail-block {
		font-size: 11px;
		margin-left: 8px;
		color: var(--text-secondary);
		opacity: 1;
	}

	.timeline-detail-key,
	.timeline-detail-sep,
	.timeline-call-count {
		opacity: 0.5;
	}

	.timeline-detail-value {
		color: var(--text-secondary);
		opacity: 1;
	}

	.timeline-info-group {
		display: inline-flex;
		align-items: center;
		margin-left: 12px;
		flex-shrink: 0;
	}

	.timeline-info-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-right: 6px;
		flex-shrink: 0;
	}

	.timeline-info-dot.fps {
		background-color: var(--color-fps);
	}

	.timeline-info-dot.call {
		background-color: var(--color-call);
	}

	.timeline-info-dot.red {
		background-color: var(--color-red);
	}

}
`
        );
        const styleElement = document.createElement("style");
        if (nonce) {
          styleElement.nonce = nonce;
        }
        styleElement.textContent = css;
        container.appendChild(styleElement);
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/Graph.js
var Graph;
var init_Graph = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/Graph.js"() {
    Graph = class {
      constructor(maxPoints = 512) {
        this.maxPoints = maxPoints;
        this.lines = {};
        this.limit = 0;
        this.limitIndex = 0;
        this.domElement = document.createElement("canvas");
        this.domElement.setAttribute("class", "graph-canvas");
        this.ctx = this.domElement.getContext("2d");
        this.width = 0;
        this.height = 0;
        this.devicePixelRatio = window.devicePixelRatio || 1;
      }
      resize(width, height) {
        this.width = width;
        this.height = height;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.domElement.width = width * this.devicePixelRatio;
        this.domElement.height = height * this.devicePixelRatio;
        this.draw();
      }
      addLine(id2, color) {
        this.lines[id2] = {
          color,
          resolved: null,
          points: []
        };
      }
      addPoint(lineId, value) {
        const line = this.lines[lineId];
        if (!line) return;
        line.points.push(value);
        if (line.points.length > this.maxPoints) {
          line.points.shift();
        }
        if (value > this.limit) {
          this.limit = value;
          this.limitIndex = 0;
        }
      }
      resetLimit() {
        this.limit = 0;
        this.limitIndex = 0;
      }
      update() {
        const width = this.domElement.clientWidth;
        const height = this.domElement.clientHeight;
        if (width === 0 || height === 0) return;
        if (width !== this.width || height !== this.height) {
          this.resize(width, height);
        } else {
          this.draw();
        }
        if (this.limitIndex++ > this.maxPoints) {
          this.resetLimit();
        }
      }
      draw() {
        const ctx = this.ctx;
        const dpr = this.devicePixelRatio;
        const width = this.width;
        const height = this.height;
        ctx.clearRect(0, 0, width * dpr, height * dpr);
        if (width === 0 || height === 0) return;
        ctx.save();
        ctx.scale(dpr, dpr);
        const pointStep = width / (this.maxPoints - 1);
        for (const id2 in this.lines) {
          const line = this.lines[id2];
          if (line.points.length === 0) continue;
          if (!line.resolved) {
            line.resolved = this._resolveColor(line.color);
          }
          const resolved = line.resolved;
          const drawColor = resolved ? resolved.color : "#ffffff";
          const offset = width - (line.points.length - 1) * pointStep;
          let fillStyle = drawColor;
          if (height > 0) {
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, drawColor);
            gradient.addColorStop(1, resolved && resolved.transparent || "rgba(0,0,0,0)");
            fillStyle = gradient;
          }
          ctx.fillStyle = fillStyle;
          ctx.globalAlpha = 0.4;
          ctx.beginPath();
          ctx.moveTo(offset, height);
          for (let i = 0; i < line.points.length; i++) {
            const x = offset + i * pointStep;
            const y = this.limit === 0 ? height : height - line.points[i] / this.limit * height;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(offset + (line.points.length - 1) * pointStep, height);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = drawColor;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 1;
          ctx.beginPath();
          for (let i = 0; i < line.points.length; i++) {
            const x = offset + i * pointStep;
            const y = this.limit === 0 ? height : height - line.points[i] / this.limit * height;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
        ctx.restore();
      }
      _resolveColor(color) {
        let resolved = color;
        if (color.startsWith("var(")) {
          const varName = color.slice(4, -1).trim();
          resolved = getComputedStyle(this.domElement).getPropertyValue(varName).trim();
          if (!resolved) {
            return null;
          }
        }
        let transparentColor = "rgba(0,0,0,0)";
        if (resolved.startsWith("#")) {
          const hex = resolved.substring(0, 7);
          transparentColor = hex + "00";
        } else if (resolved.startsWith("rgb")) {
          const match = resolved.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
          if (match) {
            transparentColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, 0)`;
          }
        }
        return {
          color: resolved,
          transparent: transparentColor
        };
      }
      dispose() {
      }
    };
  }
});

// src/runtime/inspector-storage.js
function getItem(id2) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}")[id2] || {};
  } catch {
    return {};
  }
}
function setItem(id2, value) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    data[id2] = value;
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
  }
}
var key;
var init_inspector_storage = __esm({
  "src/runtime/inspector-storage.js"() {
    key = "ijewel-dlss-inspector";
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/Profiler.js
var Profiler;
var init_Profiler = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/Profiler.js"() {
    init_EventDispatcher();
    init_Style();
    init_Graph();
    init_inspector_storage();
    Profiler = class extends EventDispatcher {
      constructor(inspector, options = {}) {
        super();
        this.inspector = inspector;
        this.nonce = options.nonce ?? inspector?.nonce ?? null;
        this.tabs = {};
        this.activeTabId = null;
        this.isResizing = false;
        this.lastHeightBottom = 350;
        this.lastWidthRight = 450;
        this.position = "bottom";
        this.detachedWindows = [];
        this.maxZIndex = 1002;
        this.nextTabOriginalIndex = 0;
        this.horizontalAlign = "right";
        this.verticalAlign = "top";
        this.setupShell();
        this.setupResizing();
        Style.init(this.domElement, this.nonce);
        this.updateWidgetPosition();
        this.setupWindowResizeListener();
        this.setupOrientationListener();
        this.checkHeaderScroll();
        this.panel.addEventListener("transitionend", (e) => {
          if (e.target === this.panel && (e.propertyName === "width" || e.propertyName === "height" || e.propertyName === "transform")) {
            this.checkHeaderScroll();
          }
        });
      }
      getSize() {
        if (this.panel.classList.contains("visible") === false || this.panel.classList.contains("no-tabs")) {
          return { width: 0, height: 0 };
        }
        if (this.position === "right") {
          return { width: this.panel.offsetWidth, height: 0 };
        } else {
          return { width: 0, height: this.panel.offsetHeight };
        }
      }
      get isMobile() {
        return this.detectMobile();
      }
      get isSmallScreen() {
        return window.innerWidth <= 768;
      }
      detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        return isMobileUA || isTouchDevice && this.isSmallScreen;
      }
      setupOrientationListener() {
        const handleOrientationChange = () => {
          if (!this.isMobile) return;
          const isLandscape = window.innerWidth > window.innerHeight;
          const targetPosition = isLandscape ? "right" : "bottom";
          if (this.position !== targetPosition) {
            this.setPosition(targetPosition);
          }
        };
        handleOrientationChange();
        window.addEventListener("orientationchange", handleOrientationChange);
        window.addEventListener("resize", handleOrientationChange);
      }
      setupWindowResizeListener() {
        const constrainDetachedWindows = () => {
          this.detachedWindows.forEach((detachedWindow) => {
            this.constrainWindowToBounds(detachedWindow.panel);
          });
        };
        const constrainMainPanel = () => {
          if (this.panel.classList.contains("maximized")) return;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          if (this.position === "bottom") {
            const currentHeight = this.panel.offsetHeight;
            const maxHeight = windowHeight - 50;
            if (currentHeight > maxHeight) {
              this.panel.style.height = `${maxHeight}px`;
              this.lastHeightBottom = maxHeight;
            }
          } else if (this.position === "right") {
            const currentWidth = this.panel.offsetWidth;
            const maxWidth = windowWidth - 50;
            if (currentWidth > maxWidth) {
              this.panel.style.width = `${maxWidth}px`;
              this.lastWidthRight = maxWidth;
            }
          }
        };
        window.addEventListener("resize", () => {
          if (this.isSmallScreen) {
            this.floatingBtn.style.display = "none";
            this.panel.classList.add("hide-position-toggle");
          } else {
            this.floatingBtn.style.display = "";
            this.panel.classList.remove("hide-position-toggle");
          }
          if (this.isMobile) {
            this.panel.classList.add("is-mobile");
          } else {
            this.panel.classList.remove("is-mobile");
          }
          constrainDetachedWindows();
          constrainMainPanel();
          this.checkHeaderScroll();
          this.notifyLayoutChange();
        });
      }
      constrainWindowToBounds(windowPanel) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const panelWidth = windowPanel.offsetWidth;
        const panelHeight = windowPanel.offsetHeight;
        let left = parseFloat(windowPanel.style.left) || windowPanel.offsetLeft || 0;
        let top = parseFloat(windowPanel.style.top) || windowPanel.offsetTop || 0;
        const halfWidth = panelWidth / 2;
        const halfHeight = panelHeight / 2;
        if (left + panelWidth > windowWidth + halfWidth) {
          left = windowWidth + halfWidth - panelWidth;
        }
        if (left < -halfWidth) {
          left = -halfWidth;
        }
        if (top + panelHeight > windowHeight + halfHeight) {
          top = windowHeight + halfHeight - panelHeight;
        }
        if (top < -halfHeight) {
          top = -halfHeight;
        }
        windowPanel.style.left = `${left}px`;
        windowPanel.style.top = `${top}px`;
      }
      setupShell() {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("three-inspector");
        this.domElement.addEventListener("keydown", (e) => e.stopPropagation());
        this.domElement.addEventListener("keyup", (e) => e.stopPropagation());
        this.toggleButton = document.createElement("button");
        this.toggleButton.classList.add("profiler-toggle");
        this.toggleButton.innerHTML = `
<span class="builtin-tabs-container"></span>
<span class="toggle-text">
	<span class="fps-counter">-</span>
	<span class="fps-label">FPS</span>
</span>
<span class="toggle-icon">
	<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-device-ipad-horizontal-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.5 20h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" /><path d="M9 17h2" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
	<span class="console-badge-container">
		<span class="console-badge error">0</span>
		<span class="console-badge warn">0</span>
	</span>
</span>
`;
        this.toggleButton.onclick = () => this.togglePanel();
        const errorBadge = this.toggleButton.querySelector(".console-badge.error");
        errorBadge.style.display = "none";
        const warnBadge = this.toggleButton.querySelector(".console-badge.warn");
        warnBadge.style.display = "none";
        this.builtinTabsContainer = this.toggleButton.querySelector(".builtin-tabs-container");
        this.miniPanel = document.createElement("div");
        this.miniPanel.classList.add("profiler-mini-panel");
        this.miniPanel.className = "profiler-mini-panel";
        this.panel = document.createElement("div");
        this.panel.classList.add("profiler-panel");
        const header = document.createElement("div");
        header.className = "profiler-header";
        header.addEventListener("wheel", (e) => {
          if (e.deltaY !== 0) {
            e.preventDefault();
            header.scrollLeft += e.deltaY * 0.25;
          }
        }, { passive: false });
        this.tabsContainer = document.createElement("div");
        this.tabsContainer.className = "profiler-tabs";
        const controls2 = document.createElement("div");
        controls2.className = "profiler-controls";
        this.floatingBtn = document.createElement("button");
        this.floatingBtn.classList.add("floating-btn");
        this.floatingBtn.title = "Switch to Right Side";
        this.floatingBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>';
        this.floatingBtn.onclick = () => this.togglePosition();
        if (this.isSmallScreen) {
          this.floatingBtn.style.display = "none";
          this.panel.classList.add("hide-position-toggle");
        }
        if (this.isMobile) {
          this.panel.classList.add("is-mobile");
        }
        this.maximizeBtn = document.createElement("button");
        this.maximizeBtn.classList.add("maximize-btn");
        this.maximizeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
        this.maximizeBtn.onclick = () => this.toggleMaximize();
        const hideBtn = document.createElement("button");
        hideBtn.classList.add("hide-panel-btn");
        hideBtn.textContent = "-";
        hideBtn.onclick = () => this.togglePanel();
        controls2.append(this.floatingBtn, this.maximizeBtn, hideBtn);
        header.append(this.tabsContainer, controls2);
        this.contentWrapper = document.createElement("div");
        this.contentWrapper.className = "profiler-content-wrapper";
        const resizer = document.createElement("div");
        resizer.className = "panel-resizer";
        this.panel.append(resizer, header, this.contentWrapper);
        this.domElement.append(this.toggleButton, this.miniPanel, this.panel);
        this.panel.classList.add(`position-${this.position}`);
        if (this.position === "right") {
          this.toggleButton.classList.add("position-right");
          this.miniPanel.classList.add("position-right");
        }
        this.toggleGraph = new Graph(80);
        this.toggleGraph.addLine("fps", "#4c4c6bff");
        this.toggleGraph.domElement.className = "profiler-toggle-graph";
        this.toggleButton.appendChild(this.toggleGraph.domElement);
      }
      setupResizing() {
        const resizer = this.panel.querySelector(".panel-resizer");
        const onStart = (e) => {
          this.isResizing = true;
          this.panel.classList.add("resizing");
          resizer.setPointerCapture(e.pointerId);
          const startX = e.clientX;
          const startY = e.clientY;
          const startHeight = this.panel.offsetHeight;
          const startWidth = this.panel.offsetWidth;
          const onMove = (moveEvent) => {
            if (!this.isResizing) return;
            moveEvent.preventDefault();
            const currentX = moveEvent.clientX;
            const currentY = moveEvent.clientY;
            if (this.position === "bottom") {
              const newHeight = startHeight - (currentY - startY);
              if (newHeight > 100 && newHeight < window.innerHeight - 50) {
                this.panel.style.height = `${newHeight}px`;
              }
            } else if (this.position === "right") {
              const newWidth = startWidth - (currentX - startX);
              if (newWidth > 200 && newWidth < window.innerWidth - 50) {
                this.panel.style.width = `${newWidth}px`;
              }
            }
            this.dispatchEvent({ type: "resize" });
            this.checkHeaderScroll();
          };
          const onEnd = () => {
            this.isResizing = false;
            this.panel.classList.remove("resizing");
            resizer.removeEventListener("pointermove", onMove);
            resizer.removeEventListener("pointerup", onEnd);
            resizer.removeEventListener("pointercancel", onEnd);
            if (!this.panel.classList.contains("maximized")) {
              if (this.position === "bottom") {
                this.lastHeightBottom = this.panel.offsetHeight;
              } else if (this.position === "right") {
                this.lastWidthRight = this.panel.offsetWidth;
              }
              this.saveLayout();
            }
          };
          resizer.addEventListener("pointermove", onMove);
          resizer.addEventListener("pointerup", onEnd);
          resizer.addEventListener("pointercancel", onEnd);
        };
        resizer.addEventListener("pointerdown", onStart);
      }
      toggleMaximize() {
        if (this.panel.classList.contains("maximized")) {
          this.panel.classList.remove("maximized");
          this.domElement.classList.remove("maximized");
          if (this.position === "bottom") {
            this.panel.style.height = `${this.lastHeightBottom}px`;
            this.panel.style.width = "100%";
          } else if (this.position === "right") {
            this.panel.style.height = "100%";
            this.panel.style.width = `${this.lastWidthRight}px`;
          }
          this.maximizeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
        } else {
          if (this.position === "bottom") {
            this.lastHeightBottom = this.panel.offsetHeight;
          } else if (this.position === "right") {
            this.lastWidthRight = this.panel.offsetWidth;
          }
          this.panel.classList.add("maximized");
          this.domElement.classList.add("maximized");
          if (this.position === "bottom") {
            this.panel.style.height = "100%";
            this.panel.style.width = "100%";
          } else if (this.position === "right") {
            this.panel.style.height = "100%";
            this.panel.style.width = "100%";
          }
          this.maximizeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>';
        }
        this.updateWidgetPosition();
        this.dispatchEvent({ type: "resize" });
      }
      hide() {
        this.miniPanel.classList.remove("visible");
        this.miniPanel.querySelectorAll(".mini-panel-content").forEach((content) => {
          content.style.display = "none";
        });
        this.builtinTabsContainer.querySelectorAll(".builtin-tab-btn").forEach((btn) => {
          btn.classList.remove("active");
        });
      }
      show(tab) {
        this.hide();
        tab.builtinButton.classList.add("active");
        if (!tab.miniContent.firstChild) {
          while (tab.content.firstChild) {
            tab.miniContent.appendChild(tab.content.firstChild);
          }
        }
        tab.miniContent.style.display = "block";
        this.miniPanel.classList.add("visible");
      }
      addTab(tab) {
        this.tabs[tab.id] = tab;
        tab.originalIndex = this.nextTabOriginalIndex++;
        if (tab.allowDetach === false) {
          tab.button.classList.add("no-detach");
        }
        tab.onVisibilityChange = () => this.updatePanelSize();
        this.setupTabDragAndDrop(tab);
        if (!tab.builtin) {
          this.tabsContainer.appendChild(tab.button);
        }
        this.contentWrapper.appendChild(tab.content);
        if (!tab.isVisible) {
          tab.button.style.display = "none";
          tab.content.style.display = "none";
        }
        if (tab.builtin) {
          this.addBuiltinTab(tab);
        }
        tab.profiler = this;
        this.updatePanelSize();
        if (this.activeTabId && tab.id === this.activeTabId) {
          this.setActiveTab(tab.id);
        }
      }
      addBuiltinTab(tab) {
        const builtinButton = document.createElement("button");
        builtinButton.className = "builtin-tab-btn";
        if (tab.icon) {
          builtinButton.innerHTML = tab.icon;
        } else {
          builtinButton.textContent = tab.button.textContent.charAt(0).toUpperCase();
        }
        builtinButton.title = tab.button.textContent;
        const miniContent = document.createElement("div");
        miniContent.className = "mini-panel-content";
        miniContent.style.display = "none";
        tab.builtinButton = builtinButton;
        tab.miniContent = miniContent;
        this.miniPanel.appendChild(miniContent);
        builtinButton.onclick = (e) => {
          e.stopPropagation();
          const isCurrentlyActive = miniContent.style.display !== "none" && miniContent.children.length > 0;
          if (isCurrentlyActive) {
            this.hide();
          } else {
            this.show(tab);
          }
        };
        this.builtinTabsContainer.appendChild(builtinButton);
        tab.builtinButton = builtinButton;
        tab.miniContent = miniContent;
        if (!tab.isVisible) {
          builtinButton.style.display = "none";
          miniContent.style.display = "none";
          const hasVisibleBuiltinButtons = Array.from(this.builtinTabsContainer.querySelectorAll(".builtin-tab-btn")).some((btn) => btn.style.display !== "none");
          if (!hasVisibleBuiltinButtons) {
            this.builtinTabsContainer.style.display = "none";
          }
        }
      }
      removeTab(tab) {
        if (!tab || this.tabs[tab.id] === void 0) return;
        delete this.tabs[tab.id];
        if (tab.isDetached && tab.detachedWindow) {
          if (tab.detachedWindow.panel && tab.detachedWindow.panel.parentNode) {
            tab.detachedWindow.panel.parentNode.removeChild(tab.detachedWindow.panel);
          }
          const index = this.detachedWindows.indexOf(tab.detachedWindow);
          if (index !== -1) {
            this.detachedWindows.splice(index, 1);
          }
        }
        if (!tab.builtin) {
          if (tab.button && tab.button.parentNode) {
            tab.button.parentNode.removeChild(tab.button);
          }
        } else {
          if (tab.builtinButton && tab.builtinButton.parentNode) {
            tab.builtinButton.parentNode.removeChild(tab.builtinButton);
          }
          if (tab.miniContent && tab.miniContent.parentNode) {
            tab.miniContent.parentNode.removeChild(tab.miniContent);
          }
          const hasVisibleBuiltinButtons = Array.from(this.builtinTabsContainer.querySelectorAll(".builtin-tab-btn")).some((btn) => btn.style.display !== "none");
          if (!hasVisibleBuiltinButtons) {
            this.builtinTabsContainer.style.display = "none";
          }
        }
        if (tab.content && tab.content.parentNode) {
          tab.content.parentNode.removeChild(tab.content);
        }
        if (this.activeTabId === tab.id) {
          this.activeTabId = null;
          const remainingTabs = Object.values(this.tabs).filter((t) => !t.isDetached && t.isVisible);
          if (remainingTabs.length > 0) {
            this.setActiveTab(remainingTabs[0].id);
          } else {
            this.updatePanelSize();
          }
        } else {
          this.updatePanelSize();
        }
        tab.onVisibilityChange = null;
        tab.profiler = null;
      }
      updatePanelSize() {
        const hasVisibleTabs = Object.values(this.tabs).some((tab) => !tab.isDetached && tab.isVisible);
        if (!hasVisibleTabs) {
          this.panel.classList.add("no-tabs");
          if (this.panel.classList.contains("maximized")) {
            this.panel.classList.remove("maximized");
            this.domElement.classList.remove("maximized");
            this.maximizeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>';
          }
          if (this.position === "bottom") {
            this.panel.style.height = "32px";
          } else if (this.position === "right") {
            this.panel.style.width = "45px";
          }
        } else {
          this.panel.classList.remove("no-tabs");
          if (Object.keys(this.tabs).length > 0) {
            if (this.position === "bottom") {
              const currentHeight = parseInt(this.panel.style.height);
              if (currentHeight === 32 || currentHeight === 38) {
                this.panel.style.height = `${this.lastHeightBottom}px`;
              }
            } else if (this.position === "right") {
              const currentWidth = parseInt(this.panel.style.width);
              if (currentWidth === 45) {
                this.panel.style.width = `${this.lastWidthRight}px`;
              }
            }
          }
        }
        this.dispatchEvent({ type: "resize" });
        this.checkHeaderScroll();
      }
      checkHeaderScroll() {
        const header = this.panel.querySelector(".profiler-header");
        if (header) {
          const hasScroll = header.scrollWidth > header.clientWidth + 1;
          if (hasScroll) {
            this.panel.classList.add("has-horizontal-scroll");
          } else {
            this.panel.classList.remove("has-horizontal-scroll");
          }
        }
      }
      setupTabDragAndDrop(tab) {
        tab.button.addEventListener("click", () => {
          if (!isDragging) {
            this.setActiveTab(tab.id);
          }
        });
        if (tab.allowDetach === false) {
          tab.button.style.cursor = "default";
          return;
        }
        let isDragging = false;
        let startX, startY;
        let hasMoved = false;
        let previewWindow = null;
        const dragThreshold = 10;
        const onDragStart = (e) => {
          startX = e.clientX;
          startY = e.clientY;
          isDragging = false;
          hasMoved = false;
          tab.button.setPointerCapture(e.pointerId);
        };
        const onDragMove = (e) => {
          const currentX = e.clientX;
          const currentY = e.clientY;
          const deltaX = Math.abs(currentX - startX);
          const deltaY = Math.abs(currentY - startY);
          if (!isDragging && (deltaX > dragThreshold || deltaY > dragThreshold)) {
            isDragging = true;
            tab.button.style.cursor = "grabbing";
            tab.button.style.opacity = "0.5";
            tab.button.style.transform = "scale(1.05)";
            previewWindow = this.createPreviewWindow(tab, currentX, currentY);
            previewWindow.style.opacity = "0.8";
          }
          if (isDragging && previewWindow) {
            hasMoved = true;
            e.preventDefault();
            previewWindow.style.left = `${currentX - 200}px`;
            previewWindow.style.top = `${currentY - 20}px`;
          }
        };
        const onDragEnd = () => {
          if (isDragging && hasMoved && previewWindow) {
            const finalX = parseInt(previewWindow.style.left) + 200;
            const finalY = parseInt(previewWindow.style.top) + 20;
            if (previewWindow.parentNode) {
              previewWindow.parentNode.removeChild(previewWindow);
            }
            this.detachTab(tab, finalX, finalY);
          } else if (!hasMoved) {
            this.setActiveTab(tab.id);
            if (previewWindow && previewWindow.parentNode) {
              previewWindow.parentNode.removeChild(previewWindow);
            }
          } else if (previewWindow) {
            if (previewWindow.parentNode) {
              previewWindow.parentNode.removeChild(previewWindow);
            }
          }
          tab.button.style.opacity = "";
          tab.button.style.transform = "";
          tab.button.style.cursor = "";
          isDragging = false;
          hasMoved = false;
          previewWindow = null;
          tab.button.removeEventListener("pointermove", onDragMove);
          tab.button.removeEventListener("pointerup", onDragEnd);
          tab.button.removeEventListener("pointercancel", onDragEnd);
        };
        tab.button.addEventListener("pointerdown", (e) => {
          if (this.isMobile && e.pointerType !== "mouse") return;
          onDragStart(e);
          tab.button.addEventListener("pointermove", onDragMove);
          tab.button.addEventListener("pointerup", onDragEnd);
          tab.button.addEventListener("pointercancel", onDragEnd);
        });
        tab.button.style.cursor = "grab";
      }
      createPreviewWindow(tab, x, y) {
        const windowPanel = document.createElement("div");
        windowPanel.className = "detached-tab-panel";
        windowPanel.style.left = `${x - 200}px`;
        windowPanel.style.top = `${y - 20}px`;
        windowPanel.style.pointerEvents = "none";
        this.maxZIndex++;
        windowPanel.style.setProperty("z-index", this.maxZIndex, "important");
        const windowHeader = document.createElement("div");
        windowHeader.className = "detached-tab-header";
        const title = document.createElement("span");
        title.textContent = tab.button.textContent.replace("\u21F1", "").trim();
        windowHeader.appendChild(title);
        const headerControls = document.createElement("div");
        headerControls.className = "detached-header-controls";
        const reattachBtn = document.createElement("button");
        reattachBtn.className = "detached-reattach-btn";
        reattachBtn.innerHTML = "\u21A9";
        headerControls.appendChild(reattachBtn);
        windowHeader.appendChild(headerControls);
        const windowContent = document.createElement("div");
        windowContent.className = "detached-tab-content";
        const resizer = document.createElement("div");
        resizer.className = "detached-tab-resizer";
        windowPanel.appendChild(resizer);
        windowPanel.appendChild(windowHeader);
        windowPanel.appendChild(windowContent);
        this.domElement.appendChild(windowPanel);
        return windowPanel;
      }
      detachTab(tab, x, y) {
        if (tab.isDetached) return;
        if (tab.allowDetach === false) return;
        const allButtons = Array.from(this.tabsContainer.children);
        const tabIdsInOrder = allButtons.map((btn) => {
          return Object.keys(this.tabs).find((id2) => this.tabs[id2].button === btn);
        }).filter((id2) => id2 !== void 0);
        const currentIndex = tabIdsInOrder.indexOf(tab.id);
        let newActiveTab = null;
        if (this.activeTabId === tab.id) {
          tab.setActive(false);
          const remainingTabs = tabIdsInOrder.filter(
            (id2) => id2 !== tab.id && !this.tabs[id2].isDetached && this.tabs[id2].isVisible
          );
          if (remainingTabs.length > 0) {
            for (let i = currentIndex - 1; i >= 0; i--) {
              if (remainingTabs.includes(tabIdsInOrder[i])) {
                newActiveTab = tabIdsInOrder[i];
                break;
              }
            }
            if (!newActiveTab) {
              for (let i = currentIndex + 1; i < tabIdsInOrder.length; i++) {
                if (remainingTabs.includes(tabIdsInOrder[i])) {
                  newActiveTab = tabIdsInOrder[i];
                  break;
                }
              }
            }
            if (!newActiveTab) {
              newActiveTab = remainingTabs[0];
            }
          }
        }
        if (tab.button.parentNode) {
          tab.button.parentNode.removeChild(tab.button);
        }
        if (tab.content.parentNode) {
          tab.content.parentNode.removeChild(tab.content);
        }
        const detachedWindow = this.createDetachedWindow(tab, x, y);
        this.detachedWindows.push(detachedWindow);
        tab.isDetached = true;
        tab.detachedWindow = detachedWindow;
        if (newActiveTab) {
          this.setActiveTab(newActiveTab);
        } else if (this.activeTabId === tab.id) {
          this.activeTabId = null;
        }
        this.updatePanelSize();
        this.saveLayout();
      }
      createDetachedWindow(tab, x, y) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const estimatedWidth = 400;
        const estimatedHeight = 300;
        let constrainedX = x - 200;
        let constrainedY = y - 20;
        if (constrainedX + estimatedWidth > windowWidth) {
          constrainedX = windowWidth - estimatedWidth;
        }
        if (constrainedX < 0) {
          constrainedX = 0;
        }
        if (constrainedY + estimatedHeight > windowHeight) {
          constrainedY = windowHeight - estimatedHeight;
        }
        if (constrainedY < 0) {
          constrainedY = 0;
        }
        const windowPanel = document.createElement("div");
        windowPanel.className = "detached-tab-panel";
        windowPanel.style.left = `${constrainedX}px`;
        windowPanel.style.top = `${constrainedY}px`;
        if (!tab.isVisible) {
          windowPanel.style.display = "none";
        }
        const windowHeader = document.createElement("div");
        windowHeader.className = "detached-tab-header";
        const title = document.createElement("span");
        title.textContent = tab.button.textContent.replace("\u21F1", "").trim();
        windowHeader.appendChild(title);
        const headerControls = document.createElement("div");
        headerControls.className = "detached-header-controls";
        const reattachBtn = document.createElement("button");
        reattachBtn.className = "detached-reattach-btn";
        reattachBtn.innerHTML = "\u21A9";
        reattachBtn.title = "Reattach to main panel";
        reattachBtn.onclick = () => this.reattachTab(tab);
        headerControls.appendChild(reattachBtn);
        windowHeader.appendChild(headerControls);
        const windowContent = document.createElement("div");
        windowContent.className = "detached-tab-content";
        windowContent.appendChild(tab.content);
        tab.content.style.display = "block";
        tab.content.classList.add("active");
        const resizerTop = document.createElement("div");
        resizerTop.className = "detached-tab-resizer-top";
        const resizerRight = document.createElement("div");
        resizerRight.className = "detached-tab-resizer-right";
        const resizerBottom = document.createElement("div");
        resizerBottom.className = "detached-tab-resizer-bottom";
        const resizerLeft = document.createElement("div");
        resizerLeft.className = "detached-tab-resizer-left";
        const resizerCorner = document.createElement("div");
        resizerCorner.className = "detached-tab-resizer";
        windowPanel.appendChild(resizerTop);
        windowPanel.appendChild(resizerRight);
        windowPanel.appendChild(resizerBottom);
        windowPanel.appendChild(resizerLeft);
        windowPanel.appendChild(resizerCorner);
        windowPanel.appendChild(windowHeader);
        windowPanel.appendChild(windowContent);
        this.domElement.appendChild(windowPanel);
        this.setupDetachedWindowDrag(windowPanel, windowHeader, tab);
        this.setupDetachedWindowResize(windowPanel, resizerTop, resizerRight, resizerBottom, resizerLeft, resizerCorner);
        windowPanel.style.setProperty("z-index", this.maxZIndex, "important");
        return { panel: windowPanel, tab };
      }
      bringWindowToFront(windowPanel) {
        this.maxZIndex++;
        windowPanel.style.setProperty("z-index", this.maxZIndex, "important");
      }
      setupDetachedWindowDrag(windowPanel, header, tab) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;
        windowPanel.addEventListener("pointerdown", () => {
          this.bringWindowToFront(windowPanel);
        });
        const onDragStart = (e) => {
          if (e.target.classList.contains("detached-reattach-btn")) {
            return;
          }
          this.bringWindowToFront(windowPanel);
          isDragging = true;
          header.style.cursor = "grabbing";
          header.setPointerCapture(e.pointerId);
          startX = e.clientX;
          startY = e.clientY;
          const rect = windowPanel.getBoundingClientRect();
          startLeft = rect.left;
          startTop = rect.top;
        };
        const onDragMove = (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const currentX = e.clientX;
          const currentY = e.clientY;
          const deltaX = currentX - startX;
          const deltaY = currentY - startY;
          let newLeft = startLeft + deltaX;
          let newTop = startTop + deltaY;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const panelWidth = windowPanel.offsetWidth;
          const panelHeight = windowPanel.offsetHeight;
          const halfWidth = panelWidth / 2;
          const halfHeight = panelHeight / 2;
          if (newLeft + panelWidth > windowWidth + halfWidth) {
            newLeft = windowWidth + halfWidth - panelWidth;
          }
          if (newLeft < -halfWidth) {
            newLeft = -halfWidth;
          }
          if (newTop + panelHeight > windowHeight + halfHeight) {
            newTop = windowHeight + halfHeight - panelHeight;
          }
          if (newTop < -halfHeight) {
            newTop = -halfHeight;
          }
          windowPanel.style.left = `${newLeft}px`;
          windowPanel.style.top = `${newTop}px`;
          const panelRect = this.panel.getBoundingClientRect();
          const isOverPanel = currentX >= panelRect.left && currentX <= panelRect.right && currentY >= panelRect.top && currentY <= panelRect.bottom;
          if (isOverPanel) {
            windowPanel.style.opacity = "0.5";
            this.panel.style.outline = "2px solid var(--accent-color)";
          } else {
            windowPanel.style.opacity = "";
            this.panel.style.outline = "";
          }
        };
        const onDragEnd = (e) => {
          if (!isDragging) return;
          isDragging = false;
          header.style.cursor = "";
          windowPanel.style.opacity = "";
          this.panel.style.outline = "";
          const currentX = e.clientX;
          const currentY = e.clientY;
          if (currentX !== void 0 && currentY !== void 0) {
            const panelRect = this.panel.getBoundingClientRect();
            const isOverPanel = currentX >= panelRect.left && currentX <= panelRect.right && currentY >= panelRect.top && currentY <= panelRect.bottom;
            if (isOverPanel && tab) {
              this.reattachTab(tab);
            } else {
              this.saveLayout();
            }
          }
          header.removeEventListener("pointermove", onDragMove);
          header.removeEventListener("pointerup", onDragEnd);
          header.removeEventListener("pointercancel", onDragEnd);
        };
        header.addEventListener("pointerdown", (e) => {
          onDragStart(e);
          header.addEventListener("pointermove", onDragMove);
          header.addEventListener("pointerup", onDragEnd);
          header.addEventListener("pointercancel", onDragEnd);
        });
        header.style.cursor = "grab";
      }
      setupDetachedWindowResize(windowPanel, resizerTop, resizerRight, resizerBottom, resizerLeft, resizerCorner) {
        const minWidth = 250;
        const minHeight = 150;
        const setupResizer = (resizer, direction) => {
          let isResizing = false;
          let startX, startY, startWidth, startHeight, startLeft, startTop;
          const onResizeStart = (e) => {
            e.preventDefault();
            e.stopPropagation();
            isResizing = true;
            this.bringWindowToFront(windowPanel);
            resizer.setPointerCapture(e.pointerId);
            startX = e.clientX;
            startY = e.clientY;
            startWidth = windowPanel.offsetWidth;
            startHeight = windowPanel.offsetHeight;
            startLeft = windowPanel.offsetLeft;
            startTop = windowPanel.offsetTop;
          };
          const onResizeMove = (e) => {
            if (!isResizing) return;
            e.preventDefault();
            const currentX = e.clientX;
            const currentY = e.clientY;
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            if (direction === "right" || direction === "corner") {
              const newWidth = startWidth + deltaX;
              const maxWidth = windowWidth - startLeft;
              if (newWidth >= minWidth && newWidth <= maxWidth) {
                windowPanel.style.width = `${newWidth}px`;
              }
            }
            if (direction === "bottom" || direction === "corner") {
              const newHeight = startHeight + deltaY;
              const maxHeight = windowHeight - startTop;
              if (newHeight >= minHeight && newHeight <= maxHeight) {
                windowPanel.style.height = `${newHeight}px`;
              }
            }
            if (direction === "left") {
              const newWidth = startWidth - deltaX;
              const maxLeft = startLeft + startWidth - minWidth;
              if (newWidth >= minWidth) {
                const newLeft = startLeft + deltaX;
                if (newLeft >= 0 && newLeft <= maxLeft) {
                  windowPanel.style.width = `${newWidth}px`;
                  windowPanel.style.left = `${newLeft}px`;
                }
              }
            }
            if (direction === "top") {
              const newHeight = startHeight - deltaY;
              const maxTop = startTop + startHeight - minHeight;
              if (newHeight >= minHeight) {
                const newTop = startTop + deltaY;
                if (newTop >= 0 && newTop <= maxTop) {
                  windowPanel.style.height = `${newHeight}px`;
                  windowPanel.style.top = `${newTop}px`;
                }
              }
            }
            this.dispatchEvent({ type: "resize" });
          };
          const onResizeEnd = () => {
            isResizing = false;
            resizer.removeEventListener("pointermove", onResizeMove);
            resizer.removeEventListener("pointerup", onResizeEnd);
            resizer.removeEventListener("pointercancel", onResizeEnd);
            this.saveLayout();
          };
          resizer.addEventListener("pointerdown", (e) => {
            onResizeStart(e);
            resizer.addEventListener("pointermove", onResizeMove);
            resizer.addEventListener("pointerup", onResizeEnd);
            resizer.addEventListener("pointercancel", onResizeEnd);
          });
        };
        setupResizer(resizerTop, "top");
        setupResizer(resizerRight, "right");
        setupResizer(resizerBottom, "bottom");
        setupResizer(resizerLeft, "left");
        setupResizer(resizerCorner, "corner");
      }
      reattachTab(tab) {
        if (!tab.isDetached) return;
        if (tab.detachedWindow) {
          const index = this.detachedWindows.indexOf(tab.detachedWindow);
          if (index > -1) {
            this.detachedWindows.splice(index, 1);
          }
          if (tab.detachedWindow.panel.parentNode) {
            tab.detachedWindow.panel.parentNode.removeChild(tab.detachedWindow.panel);
          }
          tab.detachedWindow = null;
        }
        tab.isDetached = false;
        const allTabs = Object.values(this.tabs);
        const allTabsSorted = allTabs.filter((t) => t.originalIndex !== void 0 && t.isVisible).sort((a, b) => a.originalIndex - b.originalIndex);
        const currentButtons = Array.from(this.tabsContainer.children);
        let insertIndex = 0;
        for (const t of allTabsSorted) {
          if (t.id === tab.id) {
            break;
          }
          if (!t.isDetached && !t.builtin) {
            insertIndex++;
          }
        }
        if (insertIndex >= currentButtons.length || currentButtons.length === 0) {
          this.tabsContainer.appendChild(tab.button);
        } else {
          this.tabsContainer.insertBefore(tab.button, currentButtons[insertIndex]);
        }
        this.contentWrapper.appendChild(tab.content);
        this.setActiveTab(tab.id);
        this.updatePanelSize();
        this.saveLayout();
      }
      setActiveTab(id2) {
        if (this.activeTabId && this.tabs[this.activeTabId] && !this.tabs[this.activeTabId].isDetached) {
          this.tabs[this.activeTabId].setActive(false);
        }
        this.activeTabId = id2;
        if (this.tabs[id2]) {
          const tab = this.tabs[id2];
          if (!tab.isVisible) {
            tab.show();
          }
          tab.setActive(true);
        }
        this.saveLayout();
        this.checkHeaderScroll();
      }
      togglePanel() {
        this.panel.classList.toggle("visible");
        this.toggleButton.classList.toggle("panel-open");
        this.miniPanel.classList.toggle("panel-open");
        const isVisible = this.panel.classList.contains("visible");
        if (isVisible && this.activeTabId && this.tabs[this.activeTabId]) {
          this.tabs[this.activeTabId].setActive(true);
        }
        this.updateWidgetPosition();
        this.dispatchEvent({ type: "resize" });
        this.saveLayout();
      }
      togglePosition() {
        const newPosition = this.position === "bottom" ? "right" : "bottom";
        this.setPosition(newPosition);
      }
      setPosition(targetPosition) {
        if (this.position === targetPosition) return;
        this.panel.style.transition = "none";
        const isMaximized = this.panel.classList.contains("maximized");
        if (targetPosition === "right") {
          this.position = "right";
          this.floatingBtn.classList.add("active");
          this.floatingBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 15h18"></path></svg>';
          this.floatingBtn.title = "Switch to Bottom";
          this.panel.classList.remove("position-bottom");
          this.panel.classList.add("position-right");
          this.panel.style.bottom = "";
          this.panel.style.top = "0";
          this.panel.style.right = "0";
          this.panel.style.left = "";
          if (isMaximized) {
            this.panel.style.width = "100%";
            this.panel.style.height = "100%";
          } else {
            this.panel.style.width = `${this.lastWidthRight}px`;
            this.panel.style.height = "100%";
          }
        } else {
          this.position = "bottom";
          this.floatingBtn.classList.remove("active");
          this.floatingBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="15" y1="3" x2="15" y2="21"></line></svg>';
          this.floatingBtn.title = "Switch to Right Side";
          this.panel.classList.remove("position-right");
          this.panel.classList.add("position-bottom");
          this.panel.style.top = "";
          this.panel.style.right = "";
          this.panel.style.bottom = "0";
          this.panel.style.left = "0";
          if (isMaximized) {
            this.panel.style.width = "100%";
            this.panel.style.height = "100%";
          } else {
            this.panel.style.width = "100%";
            this.panel.style.height = `${this.lastHeightBottom}px`;
          }
        }
        this.updateWidgetPosition();
        setTimeout(() => {
          this.panel.style.transition = "";
        }, 50);
        this.updatePanelSize();
        this.saveLayout();
      }
      saveLayout() {
        if (this.isLoadingLayout) return;
        const layout = {
          position: this.position,
          lastHeightBottom: this.lastHeightBottom,
          lastWidthRight: this.lastWidthRight,
          activeTabId: this.activeTabId,
          detachedTabs: [],
          isVisible: this.panel.classList.contains("visible")
        };
        this.detachedWindows.forEach((detachedWindow) => {
          const tab = detachedWindow.tab;
          const panel = detachedWindow.panel;
          const left = parseFloat(panel.style.left) || panel.offsetLeft || 0;
          const top = parseFloat(panel.style.top) || panel.offsetTop || 0;
          const width = panel.offsetWidth;
          const height = panel.offsetHeight;
          layout.detachedTabs.push({
            tabId: tab.id,
            originalIndex: tab.originalIndex !== void 0 ? tab.originalIndex : 0,
            left,
            top,
            width,
            height
          });
        });
        try {
          setItem("layout", layout);
        } catch (e) {
          console.warn("Failed to save profiler layout:", e);
        }
      }
      loadLayout() {
        this.isLoadingLayout = true;
        try {
          const layout = getItem("layout");
          if (Object.keys(layout).length === 0) return;
          if (layout.detachedTabs && layout.detachedTabs.length > 0) {
            const windowWidth2 = window.innerWidth;
            const windowHeight2 = window.innerHeight;
            layout.detachedTabs = layout.detachedTabs.map((detachedTabData) => {
              let { left, top, width, height } = detachedTabData;
              if (width > windowWidth2) {
                width = windowWidth2 - 100;
              }
              if (height > windowHeight2) {
                height = windowHeight2 - 100;
              }
              const halfWidth = width / 2;
              const halfHeight = height / 2;
              if (left + width > windowWidth2 + halfWidth) {
                left = windowWidth2 + halfWidth - width;
              }
              if (left < -halfWidth) {
                left = -halfWidth;
              }
              if (top + height > windowHeight2 + halfHeight) {
                top = windowHeight2 + halfHeight - height;
              }
              if (top < -halfHeight) {
                top = -halfHeight;
              }
              return {
                ...detachedTabData,
                left,
                top,
                width,
                height
              };
            });
          }
          if (layout.position) {
            this.position = layout.position;
          }
          if (layout.lastHeightBottom) {
            this.lastHeightBottom = layout.lastHeightBottom;
          }
          if (layout.lastWidthRight) {
            this.lastWidthRight = layout.lastWidthRight;
          }
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          if (this.lastHeightBottom > windowHeight - 50) {
            this.lastHeightBottom = windowHeight - 50;
          }
          if (this.lastWidthRight > windowWidth - 50) {
            this.lastWidthRight = windowWidth - 50;
          }
          if (this.position === "right") {
            this.floatingBtn.classList.add("active");
            this.floatingBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M3 15h18"></path></svg>';
            this.floatingBtn.title = "Switch to Bottom";
            this.panel.classList.remove("position-bottom");
            this.panel.classList.add("position-right");
            this.toggleButton.classList.add("position-right");
            this.miniPanel.classList.add("position-right");
            this.panel.style.bottom = "";
            this.panel.style.top = "0";
            this.panel.style.right = "0";
            this.panel.style.left = "";
            this.panel.style.width = `${this.lastWidthRight}px`;
            this.panel.style.height = "100%";
          } else {
            this.panel.style.height = `${this.lastHeightBottom}px`;
          }
          if (layout.isVisible) {
            this.panel.classList.add("visible");
            this.toggleButton.classList.add("panel-open");
          }
          if (layout.activeTabId) {
            this.setActiveTab(layout.activeTabId);
          }
          if (layout.detachedTabs && layout.detachedTabs.length > 0) {
            this.pendingDetachedTabs = layout.detachedTabs;
            this.restoreDetachedTabs();
          }
          this.updatePanelSize();
          this.updateWidgetPosition();
          if (this.panel.classList.contains("visible")) {
            this.miniPanel.classList.add("panel-open");
          }
        } catch (e) {
          console.warn("Failed to load profiler layout:", e);
        } finally {
          this.isLoadingLayout = false;
        }
      }
      restoreDetachedTabs() {
        if (!this.pendingDetachedTabs || this.pendingDetachedTabs.length === 0) return;
        this.pendingDetachedTabs.forEach((detachedTabData) => {
          const tab = this.tabs[detachedTabData.tabId];
          if (!tab || tab.isDetached) return;
          if (detachedTabData.originalIndex !== void 0) {
            tab.originalIndex = detachedTabData.originalIndex;
          }
          if (tab.button.parentNode) {
            tab.button.parentNode.removeChild(tab.button);
          }
          if (tab.content.parentNode) {
            tab.content.parentNode.removeChild(tab.content);
          }
          const detachedWindow = this.createDetachedWindow(tab, 0, 0);
          detachedWindow.panel.style.left = `${detachedTabData.left}px`;
          detachedWindow.panel.style.top = `${detachedTabData.top}px`;
          detachedWindow.panel.style.width = `${detachedTabData.width}px`;
          detachedWindow.panel.style.height = `${detachedTabData.height}px`;
          this.constrainWindowToBounds(detachedWindow.panel);
          this.detachedWindows.push(detachedWindow);
          tab.isDetached = true;
          tab.detachedWindow = detachedWindow;
        });
        this.pendingDetachedTabs = null;
        this.detachedWindows.forEach((detachedWindow) => {
          const currentZIndex = parseInt(getComputedStyle(detachedWindow.panel).zIndex) || 0;
          if (currentZIndex > this.maxZIndex) {
            this.maxZIndex = currentZIndex;
          }
        });
        const needsNewActiveTab = !this.activeTabId || !this.tabs[this.activeTabId] || this.tabs[this.activeTabId].isDetached || !this.tabs[this.activeTabId].isVisible;
        if (needsNewActiveTab) {
          const tabIds = Object.keys(this.tabs);
          const availableTabs = tabIds.filter(
            (id2) => !this.tabs[id2].isDetached && this.tabs[id2].isVisible
          );
          if (availableTabs.length > 0) {
            const buttons = Array.from(this.tabsContainer.children);
            const orderedTabIds = buttons.map((btn) => {
              return Object.keys(this.tabs).find((id2) => this.tabs[id2].button === btn);
            }).filter(
              (id2) => id2 !== void 0 && !this.tabs[id2].isDetached && this.tabs[id2].isVisible
            );
            this.setActiveTab(orderedTabIds[0] || availableTabs[0]);
          } else {
            this.activeTabId = null;
          }
        }
        this.updatePanelSize();
      }
      setHorizontalAlign(value) {
        this.horizontalAlign = value;
        this.updateWidgetPosition();
        return this;
      }
      setVerticalAlign(value) {
        this.verticalAlign = value;
        this.updateWidgetPosition();
        return this;
      }
      updateWidgetPosition() {
        const isVisible = this.panel.classList.contains("visible");
        const isMaximized = this.panel.classList.contains("maximized");
        const isRight = this.position === "right";
        let horizontal = this.horizontalAlign;
        let vertical = this.verticalAlign;
        if (isVisible) {
          if (isRight) {
            if (this.horizontalAlign === "right") {
              horizontal = "left";
            }
          } else {
            if (!isMaximized) {
              if (this.verticalAlign === "bottom") {
                vertical = "top";
              }
            } else {
              vertical = this.verticalAlign === "top" ? "bottom" : "top";
            }
          }
        }
        if (horizontal === "left") {
          this.toggleButton.classList.add("toggle-left");
          this.miniPanel.classList.add("toggle-left");
        } else {
          this.toggleButton.classList.remove("toggle-left");
          this.miniPanel.classList.remove("toggle-left");
        }
        if (vertical === "bottom") {
          this.toggleButton.classList.add("toggle-bottom");
          this.miniPanel.classList.add("toggle-bottom");
        } else {
          this.toggleButton.classList.remove("toggle-bottom");
          this.miniPanel.classList.remove("toggle-bottom");
        }
        this.notifyLayoutChange();
      }
      isVertical() {
        return this.position === "left" || this.position === "right" || this.panel && (this.panel.classList.contains("position-left") || this.panel.classList.contains("position-right"));
      }
      notifyLayoutChange() {
        const isVert = this.isVertical();
        this.dispatchEvent({ type: "orientationchange", position: this.position, isVertical: isVert });
        this.dispatchEvent({ type: "layoutchange", position: this.position, isVertical: isVert });
      }
      dispose() {
        for (const tab of Object.values(this.tabs)) {
          tab.dispose();
        }
        this.domElement.remove();
        for (const detachedWindow of this.detachedWindows) {
          detachedWindow.panel.remove();
        }
        this.toggleGraph.dispose();
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/Tab.js
var Tab;
var init_Tab = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/Tab.js"() {
    init_EventDispatcher();
    Tab = class extends EventDispatcher {
      constructor(title, options = {}) {
        super();
        this.id = title.toLowerCase().replace(/\s+/g, "-");
        this.button = document.createElement("button");
        this.button.className = "tab-btn";
        this.button.textContent = title;
        this.content = document.createElement("div");
        this.content.className = "profiler-content";
        this.content.classList.add(`${this.id}-content`);
        this._isActive = false;
        this.isVisible = true;
        this.isDetached = false;
        this.detachedWindow = null;
        this.allowDetach = options.allowDetach !== void 0 ? options.allowDetach : true;
        this.builtin = options.builtin !== void 0 ? options.builtin : false;
        this.icon = options.icon || null;
        this.builtinButton = null;
        this.miniContent = null;
        this.profiler = null;
        this.onVisibilityChange = null;
      }
      get inspector() {
        return this.profiler.inspector;
      }
      get isActive() {
        if (this.isDetached && this.isVisible) return true;
        const isProfilerVisible = this.profiler && this.profiler.panel.classList.contains("visible");
        if (!isProfilerVisible) return false;
        return this._isActive;
      }
      set isActive(value) {
        this._isActive = value;
      }
      init() {
      }
      update() {
      }
      setActive(isActive) {
        this.button.classList.toggle("active", isActive);
        this.content.classList.toggle("active", isActive);
        this.isActive = isActive;
      }
      show() {
        this.content.style.display = "";
        this.button.style.display = "";
        this.isVisible = true;
        if (this.isDetached && this.detachedWindow) {
          this.detachedWindow.panel.style.display = "";
        }
        if (this.onVisibilityChange) {
          this.onVisibilityChange();
        }
        this.showBuiltin();
      }
      hide() {
        this.content.style.display = "none";
        this.button.style.display = "none";
        this.isVisible = false;
        if (this.isDetached && this.detachedWindow) {
          this.detachedWindow.panel.style.display = "none";
        }
        if (this.onVisibilityChange) {
          this.onVisibilityChange();
        }
        this.hideBuiltin();
      }
      showBuiltin() {
        if (!this.builtin) return;
        if (this.profiler && this.profiler.builtinTabsContainer) {
          this.profiler.builtinTabsContainer.style.display = "";
        }
        if (this.builtinButton) {
          this.builtinButton.style.display = "";
        }
        if (this.miniContent && this.profiler) {
          this.profiler.miniPanel.querySelectorAll(".mini-panel-content").forEach((content) => {
            content.style.display = "none";
          });
          this.profiler.builtinTabsContainer.querySelectorAll(".builtin-tab-btn").forEach((btn) => {
            btn.classList.remove("active");
          });
          if (this.builtinButton) {
            this.builtinButton.classList.add("active");
          }
          if (!this.miniContent.firstChild) {
            while (this.content.firstChild) {
              this.miniContent.appendChild(this.content.firstChild);
            }
          }
          this.miniContent.style.display = "block";
          this.profiler.miniPanel.classList.add("visible");
        }
      }
      hideBuiltin() {
        if (!this.builtin) return;
        if (this.builtinButton) {
          this.builtinButton.style.display = "none";
        }
        if (this.miniContent) {
          this.miniContent.style.display = "none";
          if (this.miniContent.firstChild) {
            while (this.miniContent.firstChild) {
              this.content.appendChild(this.miniContent.firstChild);
            }
          }
        }
        if (this.builtinButton) {
          this.builtinButton.classList.remove("active");
        }
        if (this.profiler) {
          const hasVisibleContent = Array.from(this.profiler.miniPanel.querySelectorAll(".mini-panel-content")).some((content) => content.style.display !== "none");
          if (!hasVisibleContent) {
            this.profiler.miniPanel.classList.remove("visible");
          }
          const hasVisibleBuiltinButtons = Array.from(this.profiler.builtinTabsContainer.querySelectorAll(".builtin-tab-btn")).some((btn) => btn.style.display !== "none");
          if (!hasVisibleBuiltinButtons) {
            this.profiler.builtinTabsContainer.style.display = "none";
          }
        }
      }
      dispose() {
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/List.js
var List;
var init_List = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/List.js"() {
    List = class {
      constructor(...headers) {
        this.headers = headers;
        this.children = [];
        this.domElement = document.createElement("div");
        this.domElement.className = "list-container";
        this.domElement.style.padding = "5px 10px 10px 10px";
        this.id = `list-${Math.random().toString(36).slice(2, 11)}`;
        this.domElement.dataset.listId = this.id;
        const headerRow = document.createElement("div");
        headerRow.className = "list-header";
        this.headers.forEach((headerText) => {
          const headerCell = document.createElement("div");
          headerCell.className = "list-header-cell";
          headerCell.textContent = headerText;
          headerRow.appendChild(headerCell);
        });
        this.domElement.appendChild(headerRow);
      }
      setGridStyle(gridTemplate) {
        this.domElement.style.setProperty("--list-grid-template", gridTemplate);
      }
      setViewMode(mode2) {
        if (mode2 === "grid") {
          this.domElement.classList.add("grid-mode");
        } else {
          this.domElement.classList.remove("grid-mode");
        }
      }
      add(item) {
        if (item.parent !== null) {
          item.parent.remove(item);
        }
        item.domElement.classList.add("header-wrapper", "section-start");
        item.parent = this;
        this.children.push(item);
        this.domElement.appendChild(item.domElement);
      }
      remove(item) {
        const index = this.children.indexOf(item);
        if (index !== -1) {
          this.children.splice(index, 1);
          this.domElement.removeChild(item.domElement);
          item.parent = null;
        }
        return this;
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/Item.js
var Item;
var init_Item = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/Item.js"() {
    Item = class {
      constructor(...data) {
        this.children = [];
        this.isOpen = true;
        this.isCollapsible = false;
        this.childrenContainer = null;
        this.parent = null;
        this.domElement = document.createElement("div");
        this.domElement.className = "list-item-wrapper";
        this.itemRow = document.createElement("div");
        this.itemRow.className = "list-item-row";
        this.userData = {};
        this.data = [];
        data.forEach((cellData, index) => {
          const cell = document.createElement("div");
          cell.className = "list-item-cell";
          this.itemRow.appendChild(cell);
          this.setValue(index, cellData);
        });
        this.domElement.appendChild(this.itemRow);
        this.onItemClick = this.onItemClick.bind(this);
      }
      onItemClick(e) {
        if (e.target.closest("button, a, input, label")) return;
        this.toggle();
      }
      add(item, index = this.children.length) {
        if (item.parent !== null) {
          item.parent.remove(item);
        }
        item.parent = this;
        this.children.splice(index, 0, item);
        this.itemRow.classList.add("collapsible");
        if (!this.childrenContainer) {
          this.childrenContainer = document.createElement("div");
          this.childrenContainer.className = "list-children-container";
          this.childrenContainer.classList.toggle("closed", !this.isOpen);
          this.domElement.appendChild(this.childrenContainer);
          this.itemRow.addEventListener("click", this.onItemClick);
        }
        this.childrenContainer.insertBefore(
          item.domElement,
          this.childrenContainer.children[index] || null
        );
        this.updateToggler();
        return this;
      }
      remove(item) {
        const index = this.children.indexOf(item);
        if (index !== -1) {
          this.children.splice(index, 1);
          this.childrenContainer.removeChild(item.domElement);
          item.parent = null;
          if (this.children.length === 0) {
            this.itemRow.classList.remove("collapsible");
            this.itemRow.removeEventListener("click", this.onItemClick);
            this.childrenContainer.remove();
            this.childrenContainer = null;
          }
          this.updateToggler();
        }
        return this;
      }
      updateToggler() {
        const firstCell = this.itemRow.querySelector(".list-item-cell:first-child");
        let toggler = this.itemRow.querySelector(".item-toggler");
        if (this.children.length > 0 || this.isCollapsible) {
          if (!toggler) {
            toggler = document.createElement("span");
            toggler.className = "item-toggler";
            firstCell.prepend(toggler);
          }
          if (this.isOpen) {
            this.itemRow.classList.add("open");
          }
        } else if (toggler) {
          toggler.remove();
        }
      }
      setCollapsible(collapsible) {
        this.isCollapsible = collapsible;
        if (collapsible) {
          this.itemRow.classList.add("collapsible");
          if (!this.childrenContainer) {
            this.childrenContainer = document.createElement("div");
            this.childrenContainer.className = "list-children-container";
            this.childrenContainer.classList.toggle("closed", !this.isOpen);
            this.domElement.appendChild(this.childrenContainer);
            this.itemRow.addEventListener("click", this.onItemClick);
          }
        } else {
          this.itemRow.classList.remove("collapsible");
        }
        this.updateToggler();
        return this;
      }
      toggle() {
        this.isOpen = !this.isOpen;
        this.itemRow.classList.toggle("open", this.isOpen);
        if (this.childrenContainer) {
          this.childrenContainer.classList.toggle("closed", !this.isOpen);
        }
        return this;
      }
      close() {
        if (this.isOpen) {
          this.toggle();
        }
        return this;
      }
      show() {
        this.domElement.style.display = "";
        return this;
      }
      hide() {
        this.domElement.style.display = "none";
        return this;
      }
      setValue(index, value) {
        this.data[index] = value;
        const cell = this.itemRow.children[index];
        if (cell) {
          const toggler = cell.querySelector(".item-toggler");
          cell.innerHTML = "";
          if (toggler) {
            cell.appendChild(toggler);
          }
          if (value instanceof HTMLElement) {
            cell.appendChild(value);
          } else {
            cell.append(String(value));
          }
        }
        return this;
      }
      getValue(index) {
        return this.data[index];
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/utils.js
function createValueSpan() {
  const span = document.createElement("span");
  span.className = "value";
  return span;
}
function info(parentNode, text) {
  let infoIcon = parentNode.querySelector(".info-icon");
  if (!infoIcon) {
    infoIcon = document.createElement("span");
    infoIcon.className = "info-icon";
    infoIcon.textContent = "i";
    parentNode.appendChild(infoIcon);
  } else {
    const newInfoIcon = infoIcon.cloneNode(true);
    infoIcon.replaceWith(newInfoIcon);
    infoIcon = newInfoIcon;
  }
  const showTooltip = () => {
    const container = infoIcon.closest(".three-inspector") || document.body;
    let tooltip = container.querySelector(".three-inspector-info-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.className = "info-tooltip three-inspector-info-tooltip";
      container.appendChild(tooltip);
    }
    const html = text.trim().replace(/### (.*?)(?:\r?\n|$)/g, "<h3>$1</h3>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>");
    tooltip.innerHTML = html;
    const rect = infoIcon.getBoundingClientRect();
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const margin = 8;
    const half = tooltipWidth / 2;
    const center = Math.max(margin + half, Math.min(window.innerWidth - margin - half, rect.left + rect.width / 2));
    tooltip.style.left = center + "px";
    tooltip.style.top = rect.top - 8 + "px";
    tooltip.style.opacity = "1";
    tooltip.style.visibility = "visible";
  };
  const hideTooltip = () => {
    const container = infoIcon.closest(".three-inspector") || document.body;
    const tooltip = container.querySelector(".three-inspector-info-tooltip");
    if (tooltip) {
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
    }
  };
  let isClickedOpen = false;
  const onDocumentPointerDown = (e) => {
    if (!infoIcon.contains(e.target)) {
      isClickedOpen = false;
      infoIcon.classList.remove("active");
      hideTooltip();
      document.removeEventListener("pointerdown", onDocumentPointerDown);
    }
  };
  infoIcon.addEventListener("pointerenter", () => {
    showTooltip();
  });
  infoIcon.addEventListener("pointerleave", () => {
    if (!isClickedOpen) {
      hideTooltip();
    }
  });
  infoIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    isClickedOpen = !isClickedOpen;
    if (isClickedOpen) {
      infoIcon.classList.add("active");
      showTooltip();
      document.addEventListener("pointerdown", onDocumentPointerDown);
    } else {
      infoIcon.classList.remove("active");
      hideTooltip();
      document.removeEventListener("pointerdown", onDocumentPointerDown);
    }
  });
  return infoIcon;
}
var init_utils = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/utils.js"() {
  }
});

// ../node_modules/three/examples/jsm/inspector/ui/Values.js
var Value, ValueNumber, ValueCheckbox, ValueSlider, ValueSelect, ValueColor, ValueButton, ValueString;
var init_Values = __esm({
  "../node_modules/three/examples/jsm/inspector/ui/Values.js"() {
    init_EventDispatcher();
    Value = class extends EventDispatcher {
      constructor() {
        super();
        this.domElement = document.createElement("div");
        this.domElement.className = "param-control";
        this._onChangeFunction = null;
        this._changeTimeout = null;
        this._debounceTime = 0;
        this.addEventListener("change", (e) => {
          clearTimeout(this._changeTimeout);
          this._changeTimeout = setTimeout(() => {
            if (this._onChangeFunction) this._onChangeFunction(e.value);
          }, this._debounceTime);
        });
      }
      setValue() {
        this.dispatchChange();
        return this;
      }
      getValue() {
        return null;
      }
      dispatchChange() {
        this.dispatchEvent({ type: "change", value: this.getValue() });
      }
      onChange(callback) {
        this._onChangeFunction = callback;
        return this;
      }
      debounce(time) {
        this._debounceTime = time;
        return this;
      }
      show() {
        this.dispatchEvent({ type: "show" });
        return this;
      }
      hide() {
        this.dispatchEvent({ type: "hide" });
        return this;
      }
    };
    ValueNumber = class extends Value {
      constructor({ value = 0, step = 0.1, min = -Infinity, max = Infinity }) {
        super();
        this.input = document.createElement("input");
        this.input.type = "number";
        this.input.value = value;
        this.input.step = step;
        this.input.min = min;
        this.input.max = max;
        this.input.addEventListener("change", this._onChangeValue.bind(this));
        this.domElement.appendChild(this.input);
        this.addDragHandler();
      }
      _onChangeValue() {
        const value = parseFloat(this.input.value);
        const min = parseFloat(this.input.min);
        const max = parseFloat(this.input.max);
        if (value > max) {
          this.input.value = max;
        } else if (value < min) {
          this.input.value = min;
        } else if (isNaN(value)) {
          this.input.value = min;
        }
        this.dispatchChange();
      }
      addDragHandler() {
        let isDragging = false;
        let startY, startValue;
        this.input.style.touchAction = "none";
        this.input.addEventListener("pointerdown", (e) => {
          isDragging = true;
          startY = e.clientY;
          startValue = parseFloat(this.input.value);
          document.body.style.cursor = "ns-resize";
        });
        document.addEventListener("pointermove", (e) => {
          if (isDragging) {
            const deltaY = startY - e.clientY;
            const step = parseFloat(this.input.step) || 1;
            const min = parseFloat(this.input.min);
            const max = parseFloat(this.input.max);
            let stepSize = step;
            if (!isNaN(max) && isFinite(min)) {
              stepSize = (max - min) / 100;
            }
            const change = deltaY * stepSize;
            let newValue = startValue + change;
            newValue = Math.max(min, Math.min(newValue, max));
            const precision = (String(step).split(".")[1] || []).length;
            this.input.value = newValue.toFixed(precision);
            this.input.dispatchEvent(new Event("input"));
            this.dispatchChange();
          }
        });
        document.addEventListener("pointerup", () => {
          if (isDragging) {
            isDragging = false;
            document.body.style.cursor = "default";
          }
        });
      }
      setValue(val) {
        this.input.value = val;
        return super.setValue(val);
      }
      getValue() {
        return parseFloat(this.input.value);
      }
    };
    ValueCheckbox = class extends Value {
      constructor({ value = false }) {
        super();
        const label = document.createElement("label");
        label.className = "custom-checkbox";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = value;
        this.checkbox = checkbox;
        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        this.domElement.appendChild(label);
        checkbox.addEventListener("change", () => {
          this.dispatchChange();
        });
      }
      setValue(val) {
        this.checkbox.checked = val;
        return super.setValue(val);
      }
      getValue() {
        return this.checkbox.checked;
      }
    };
    ValueSlider = class extends Value {
      constructor({ value = 0, min = 0, max = 1, step = 0.01 }) {
        super();
        this.slider = document.createElement("input");
        this.slider.type = "range";
        this.slider.min = min;
        this.slider.max = max;
        this.slider.step = step;
        const numberValue = new ValueNumber({ value, min, max, step });
        this.numberInput = numberValue.input;
        this.numberInput.style.flexBasis = "80px";
        this.numberInput.style.flexShrink = "0";
        this.slider.value = value;
        this.domElement.append(this.slider, this.numberInput);
        this.slider.addEventListener("input", () => {
          this.numberInput.value = this.slider.value;
          this.dispatchChange();
        });
        numberValue.addEventListener("change", () => {
          this.slider.value = parseFloat(this.numberInput.value);
          this.dispatchChange();
        });
      }
      setValue(val) {
        this.slider.value = val;
        this.numberInput.value = val;
        return super.setValue(val);
      }
      getValue() {
        return parseFloat(this.slider.value);
      }
      step(value) {
        this.slider.step = value;
        this.numberInput.step = value;
        this.slider.value = parseFloat(this.numberInput.value);
        return this;
      }
    };
    ValueSelect = class extends Value {
      constructor({ options = [], value = "" }) {
        super();
        const select = document.createElement("select");
        const createOption = (name, optionValue) => {
          const optionEl = document.createElement("option");
          optionEl.value = name;
          optionEl.textContent = name;
          if (optionValue == value) optionEl.selected = true;
          select.appendChild(optionEl);
          return optionEl;
        };
        if (Array.isArray(options)) {
          options.forEach((opt) => createOption(opt, opt));
        } else {
          Object.entries(options).forEach(([key2, value2]) => createOption(key2, value2));
        }
        this.domElement.appendChild(select);
        select.addEventListener("change", () => {
          this.dispatchChange();
        });
        this.options = options;
        this.select = select;
      }
      setValue(val) {
        if (Array.isArray(this.options)) {
          this.select.value = val;
        } else {
          const entry = Object.entries(this.options).find(([, v]) => v === val);
          if (entry) {
            this.select.value = entry[0];
          } else {
            this.select.value = val;
          }
        }
        return super.setValue(val);
      }
      getValue() {
        const options = this.options;
        if (Array.isArray(options)) {
          return options[this.select.selectedIndex];
        } else {
          return options[this.select.value];
        }
      }
    };
    ValueColor = class extends Value {
      constructor({ value = "#ffffff" }) {
        super();
        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = this._getColorHex(value);
        this.colorInput = colorInput;
        this._value = value;
        colorInput.addEventListener("input", () => {
          const colorValue = colorInput.value;
          if (this._value.isColor) {
            this._value.setHex(parseInt(colorValue.slice(1), 16));
          } else {
            this._value = colorValue;
          }
          this.dispatchChange();
        });
        this.domElement.appendChild(colorInput);
      }
      setValue(val) {
        const colorHex = this._getColorHex(val);
        this.colorInput.value = colorHex;
        if (this._value && this._value.isColor) {
          this._value.setHex(parseInt(colorHex.slice(1), 16));
        } else {
          this._value = val;
        }
        return super.setValue(val);
      }
      _getColorHex(color) {
        if (color && color.isColor) {
          color = color.getHex();
        }
        if (typeof color === "number") {
          color = "#" + color.toString(16).padStart(6, "0");
        } else if (typeof color === "string" && color[0] !== "#") {
          color = "#" + color;
        }
        return color;
      }
      getValue() {
        let value = this._value;
        if (typeof value === "string") {
          value = parseInt(value.slice(1), 16);
        }
        return value;
      }
    };
    ValueButton = class extends Value {
      constructor({ text = "Button", value = () => {
      } }) {
        super();
        const button = document.createElement("button");
        button.textContent = text;
        button.onclick = value;
        this.domElement.appendChild(button);
      }
    };
    ValueString = class extends Value {
      constructor({ value = "" }) {
        super();
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        this.input = input;
        input.addEventListener("input", () => {
          this.dispatchChange();
        });
        this.domElement.appendChild(input);
      }
      setValue(val) {
        this.input.value = val;
        return super.setValue(val);
      }
      getValue() {
        return this.input.value;
      }
    };
  }
});

// ../node_modules/three/examples/jsm/inspector/tabs/Parameters.js
var ParametersGroup, Parameters;
var init_Parameters = __esm({
  "../node_modules/three/examples/jsm/inspector/tabs/Parameters.js"() {
    init_Tab();
    init_List();
    init_Item();
    init_utils();
    init_Values();
    ParametersGroup = class _ParametersGroup {
      constructor(parameters2, name) {
        this.parameters = parameters2;
        this.paramList = new Item(name);
        this.paramList.setCollapsible(true);
        this.objects = [];
      }
      close() {
        this.paramList.close();
        return this;
      }
      name(name) {
        this.paramList.setValue(0, name);
        return this;
      }
      show() {
        this.paramList.show();
        return this;
      }
      hide() {
        this.paramList.hide();
        return this;
      }
      add(object, property, ...params) {
        const value = object[property];
        const type = typeof value;
        let item = null;
        if (typeof params[0] === "object") {
          item = this.addSelect(object, property, params[0]);
        } else if (type === "number") {
          if (params.length >= 2) {
            item = this.addSlider(object, property, ...params);
          } else {
            item = this.addNumber(object, property, ...params);
          }
        } else if (type === "boolean") {
          item = this.addBoolean(object, property);
        } else if (type === "string") {
          item = this.addString(object, property);
        } else if (type === "function") {
          item = this.addButton(object, property, ...params);
        }
        return item;
      }
      _addInfo(editor, itemNode) {
        editor.info = (text) => {
          info(itemNode, text);
          return editor;
        };
      }
      _addParameter(object, property, editor, subItem) {
        editor.name = (name) => {
          if (subItem.data[0].childNodes.length > 0 && subItem.data[0].firstChild.nodeType === 3) {
            subItem.data[0].firstChild.textContent = name;
          } else {
            subItem.data[0].insertBefore(document.createTextNode(name), subItem.data[0].firstChild);
          }
          return editor;
        };
        this._addInfo(editor, subItem.data[0]);
        editor.listen = () => {
          const update = () => {
            const value = editor.getValue();
            const propertyValue = object[property];
            if (value !== propertyValue) {
              editor.setValue(propertyValue);
            }
            requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
          return editor;
        };
        this._registerParameter(object, property, editor, subItem);
      }
      _registerParameter(object, property, editor, subItem) {
        this.objects.push({ object, key: property, editor, subItem });
        editor.addEventListener("show", () => subItem.show());
        editor.addEventListener("hide", () => subItem.hide());
      }
      addString(object, property) {
        const value = object[property];
        const editor = new ValueString({ value });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const description = createValueSpan();
        description.textContent = property;
        const subItem = new Item(description, editor.domElement);
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        this._addParameter(object, property, editor, subItem);
        return editor;
      }
      addFolder(name) {
        const group = new _ParametersGroup(this.parameters, name);
        this.paramList.add(group.paramList);
        return group;
      }
      addBoolean(object, property) {
        const value = object[property];
        const editor = new ValueCheckbox({ value });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const description = createValueSpan();
        description.textContent = property;
        const subItem = new Item(description, editor.domElement);
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        itemRow.addEventListener("click", (e) => {
          if (e.target.closest("label")) return;
          const checkbox = itemRow.querySelector('input[type="checkbox"]');
          if (checkbox) {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event("change"));
          }
        });
        this._addParameter(object, property, editor, subItem);
        return editor;
      }
      addSelect(object, property, options) {
        const value = object[property];
        const editor = new ValueSelect({ options, value });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const description = createValueSpan();
        description.textContent = property;
        const subItem = new Item(description, editor.domElement);
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        this._addParameter(object, property, editor, subItem);
        return editor;
      }
      addColor(object, property) {
        const value = object[property];
        const editor = new ValueColor({ value });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const description = createValueSpan();
        description.textContent = property;
        const subItem = new Item(description, editor.domElement);
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        this._addParameter(object, property, editor, subItem);
        return editor;
      }
      addSlider(object, property, min = 0, max = 1, step = 0.01) {
        const value = object[property];
        const editor = new ValueSlider({ value, min, max, step });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const description = createValueSpan();
        description.textContent = property;
        const subItem = new Item(description, editor.domElement);
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        this._addParameter(object, property, editor, subItem);
        return editor;
      }
      addNumber(object, property, ...params) {
        const value = object[property];
        const [min, max] = params;
        const editor = new ValueNumber({ value, min, max });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const description = createValueSpan();
        description.textContent = property;
        const subItem = new Item(description, editor.domElement);
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        this._addParameter(object, property, editor, subItem);
        return editor;
      }
      addButton(object, property) {
        const value = object[property];
        const editor = new ValueButton({ text: property, value });
        editor.addEventListener("change", ({ value: value2 }) => {
          object[property] = value2;
        });
        const subItem = new Item(editor.domElement);
        subItem.itemRow.childNodes[0].style.gridColumn = "1 / -1";
        this.paramList.add(subItem);
        const itemRow = subItem.domElement.firstChild;
        itemRow.classList.add("actionable");
        editor.name = (name) => {
          const buttonNode = editor.domElement.childNodes[0];
          if (buttonNode.childNodes.length > 0 && buttonNode.firstChild.nodeType === 3) {
            buttonNode.firstChild.textContent = name;
          } else {
            buttonNode.insertBefore(document.createTextNode(name), buttonNode.firstChild);
          }
          return editor;
        };
        this._addInfo(editor, editor.domElement.childNodes[0]);
        this._registerParameter(object, property, editor, subItem);
        return editor;
      }
    };
    Parameters = class extends Tab {
      constructor(options = {}) {
        super(options.name || "Parameters", options);
        const paramList = new List("Property", "Value");
        paramList.domElement.classList.add("parameters");
        paramList.setGridStyle(".5fr 1fr");
        paramList.domElement.style.minWidth = "300px";
        const scrollWrapper = document.createElement("div");
        scrollWrapper.className = "list-scroll-wrapper";
        scrollWrapper.appendChild(paramList.domElement);
        this.content.appendChild(scrollWrapper);
        this.paramList = paramList;
        this.groups = [];
      }
      createGroup(name) {
        const group = new ParametersGroup(this, name);
        this.paramList.add(group.paramList);
        this.groups.push(group);
        return group;
      }
    };
  }
});

// src/runtime/demo-ui.js
function setPresented(active) {
  const presented = !!active;
  presentedIndicator.dataset.state = presented ? "on" : "off";
  presentedIndicator.querySelector("strong").textContent = `DLSS 5 ${presented ? "ON" : "OFF"}`;
  presentedIndicator.setAttribute("aria-label", `DLSS 5 is ${presented ? "" : "not "}applied to the presented frame`);
  presentedIndicator.setAttribute("aria-pressed", String(presented));
  document.body.dataset.dlssPresented = String(presented);
}
function reflect(editor, value) {
  if (editor.getValue() === value) return;
  editor.setValue(value);
  clearTimeout(editor._changeTimeout);
}
function enableControl(editor, enabled) {
  editor.domElement.dataset.disabled = String(!enabled);
  const row = editor.domElement.closest(".list-item-row");
  if (row) row.inert = !enabled;
  editor.domElement.querySelectorAll("input,select,button").forEach((input) => {
    input.disabled = !enabled;
  });
}
function labelControl(editor, label, id2) {
  editor.name(label);
  const inputs = editor.domElement.querySelectorAll("input,select,button");
  inputs.forEach((input) => input.setAttribute("aria-label", label));
  if (id2 && inputs[0]) inputs[0].id = id2;
  return editor;
}
function trackViewer(viewer) {
  if (viewer === trackedViewer) return;
  trackedViewer?.removeEventListener("postRender", sourceFrame);
  trackedViewer = viewer;
  trackedViewer?.addEventListener("postRender", sourceFrame);
}
function recordFrame(kind) {
  const times = frameTimes[kind], now = performance.now();
  times.push(now);
  while (times.length > 2 && times[0] < now - 1500) times.shift();
}
function showingDlss() {
  return sr ? runtime?.visible : runtime?.neuralVisible;
}
function isComparing() {
  return sr ? runtime?.compare : runtime?.compareSource;
}
function syncRuntime() {
  const enabled = !!runtime && !loadingScene && globalThis.dlssSceneReady && (sr || runtime.settings.enabled);
  enableControl(sceneControl, !!globalThis.dlssChangeScene && !loadingScene && !globalThis.dlssSceneLoading);
  enableControl(live, enabled);
  enableControl(output, enabled && !!runtime?.result);
  enableControl(render, enabled && !runtime?.running);
  reflect(live, !!runtime?.live);
  reflect(output, isComparing() ? "source" : "dlss");
  if (localEnvironmentEditor) {
    const localScene = globalThis.dlssSceneId === "local-file";
    const row = localEnvironmentEditor.domElement.closest(".list-item-wrapper") || localEnvironmentEditor.domElement;
    row.style.setProperty("display", localScene ? "" : "none", localScene ? "" : "important");
    const embedded = localEnvironmentEditor.domElement.querySelector('option[value="embedded"]');
    if (embedded) embedded.disabled = !globalThis.dlssEmbeddedEnvironment;
    if (localScene) reflect(localEnvironmentEditor, globalThis.dlssLocalEnvironment || "studio-small-08");
  }
  const now = performance.now();
  const neural = showingDlss(), times = frameTimes[neural ? "dlss" : "source"];
  let active = !document.hidden && !globalThis.dlssSceneLoading && (neural ? runtime?.live || runtime?.running : runtime?.viewer?.renderEnabled);
  const elapsed = times.length > 1 ? (times.at(-1) - times[0]) / (times.length - 1) : 0;
  if (!neural && now - times.at(-1) > Math.max(1500, elapsed * 2)) active = false;
  const fps = active && elapsed > 0 ? 1e3 / Math.max(elapsed, now - times.at(-1)) : 0;
  fpsText.textContent = fps > 0 && fps < 10 ? fps.toFixed(1) : fps.toFixed(0);
  profiler.toggleButton.title = `${neural ? "DLSS completed" : "WebGI rendered"} frames per second${active ? "" : " \xB7 Paused"} \xB7 Open performance`;
  if (!active) times.length = 0;
  profiler.toggleGraph.addPoint("fps", fps);
  profiler.toggleGraph.update();
}
function updateScene() {
  const id2 = globalThis.dlssSceneId || "selection-five";
  reflect(sceneControl, id2);
  const attribution = document.querySelector("#sceneAttribution");
  attribution.replaceChildren();
  if (attributions[id2]) {
    const [title, href, credit] = attributions[id2];
    const link = document.createElement("a");
    link.textContent = title;
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener";
    attribution.append(link, credit);
  }
}
var query, sr, chain, profiler, parameters, performanceTab, narrowScreen, fpsText, presentedIndicator, runtime, actions, loadingScene, localEnvironmentEditor, frameTimes, trackedViewer, sourceFrame, controls, demo, scenes, sceneControl, mode, modeRow, live, output, render, stats, metrics, statEditors, statusText, demoUi, timer, attributions;
var init_demo_ui = __esm({
  "src/runtime/demo-ui.js"() {
    init_Profiler();
    init_Parameters();
    query = new URLSearchParams(location.search);
    sr = query.get("sr") === "1";
    chain = sr && query.get("srChain") === "1";
    if (query.has("scene")) {
      const url = new URL(location.href);
      url.searchParams.delete("scene");
      history.replaceState(history.state, "", url);
    }
    profiler = new Profiler(null);
    parameters = new Parameters({ builtin: true, icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h8m4 0h4M4 12h2m4 0h10M4 18h10m4 0h2"/><circle cx="14" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="18" r="2"/></svg>' });
    performanceTab = new Parameters({ name: "Performance", allowDetach: false });
    profiler.addTab(parameters);
    profiler.addTab(performanceTab);
    profiler.setActiveTab(performanceTab.id);
    document.body.append(profiler.domElement);
    narrowScreen = matchMedia("(max-width: 700px)");
    if (!narrowScreen.matches) profiler.show(parameters);
    narrowScreen.addEventListener("change", (event) => {
      if (event.matches) profiler.hide();
    });
    profiler.toggleButton.title = "Rendered frames per second \xB7 Open performance";
    profiler.toggleButton.setAttribute("aria-label", "Open performance");
    parameters.builtinButton.setAttribute("aria-label", "Toggle settings");
    fpsText = profiler.toggleButton.querySelector(".fps-counter");
    presentedIndicator = document.querySelector("#dlssPresentedIndicator");
    runtime = null;
    actions = null;
    loadingScene = false;
    localEnvironmentEditor = null;
    frameTimes = { dlss: [], source: [] };
    trackedViewer = null;
    presentedIndicator.addEventListener("click", () => actions?.compareShortcut?.());
    sourceFrame = () => {
      if (!showingDlss()) recordFrame("source");
    };
    controls = {
      scene: "selection-five",
      mode: sr ? chain ? "srnr" : "sr" : "nr",
      live: false,
      output: "dlss",
      render: () => actions?.render()
    };
    demo = parameters.createGroup("Demo");
    scenes = { "Cowboy Gramps": "selection-five" };
    sceneControl = labelControl(demo.add(controls, "scene", scenes), "scene", "demoScene").onChange(async (value) => {
      if (loadingScene || !globalThis.dlssChangeScene) return;
      if (value === "local-file") {
        globalThis.dlssPromptForFile?.();
        reflect(sceneControl, globalThis.dlssSceneId || "selection-five");
        return;
      }
      loadingScene = true;
      syncRuntime();
      try {
        await globalThis.dlssChangeScene(value);
      } catch (error) {
        globalThis.dlssLoading?.fail(error);
        const status2 = document.querySelector("#dlssWebGpuStatus");
        status2.dataset.state = "error";
        status2.textContent = `Scene loading failed: ${error.message}`;
        reflect(sceneControl, globalThis.dlssSceneId || "selection-five");
      } finally {
        loadingScene = false;
        syncRuntime();
      }
    });
    mode = labelControl(demo.add(controls, "mode", { "Neural rendering": "nr" }), "mode", "dlssMode").onChange((value) => {
      const url = new URL(location.href);
      if (value === "nr") url.searchParams.delete("sr");
      else url.searchParams.set("sr", "1");
      if (value === "srnr") url.searchParams.set("srChain", "1");
      else url.searchParams.delete("srChain");
      try {
        sessionStorage.setItem("dlss-demo-scene", globalThis.dlssSceneId || "selection-five");
      } catch {
      }
      location.assign(url);
    });
    modeRow = mode.domElement.closest(".list-item-wrapper") || mode.domElement;
    modeRow.style.setProperty("display", "none", "important");
    live = labelControl(demo.add(controls, "live"), "live \xB7 L", "nrLive").onChange((value) => {
      if (runtime && value !== runtime.live) actions.toggleLive();
    });
    output = labelControl(demo.add(controls, "output", { DLSS: "dlss", Original: "source" }), "output \xB7 F6", "nrCompare").onChange((value) => {
      if (runtime && value === "source" !== isComparing()) actions.compare();
    });
    render = labelControl(demo.add(controls, "render"), "Render \xB7 R", "nrRender");
    stats = { resolution: "\u2014", readback: "\u2014", preprocessing: "\u2014", network: "\u2014", presentation: "\u2014" };
    metrics = performanceTab.createGroup("Production timings");
    statEditors = /* @__PURE__ */ new Map();
    for (const [key2, label] of Object.entries({ resolution: "output", readback: "WebGL readback", preprocessing: "upload / preprocessing", network: "network execution", presentation: "presentation" })) {
      const editor = labelControl(metrics.add(stats, key2), label);
      editor.input.readOnly = true;
      statEditors.set(key2, editor);
    }
    statusText = document.createElement("p");
    statusText.className = "demo-status";
    statusText.textContent = "FPS counts new frames in the visible output: DLSS completions or WebGI renders. 0 means paused. Timings update after each DLSS render.";
    performanceTab.content.append(statusText);
    demoUi = {
      profiler,
      setPresented,
      mountFileImport(promptForFile) {
        if (document.querySelector("#openLocalModel")) return;
        const files = parameters.createGroup("Local 3D model");
        const local = { open: () => promptForFile?.(), environment: globalThis.dlssLocalEnvironment || "studio-small-08" };
        labelControl(files.add(local, "open"), "Load your 3D file", "openLocalModel").info("GLB, GLTF, DRC, OBJ/MTL, FBX, STL, Rhino 3DM and ZIP. Select dependent files together. You can also drag files or a folder onto the viewer.");
        localEnvironmentEditor = labelControl(
          files.add(local, "environment", globalThis.dlssLocalEnvironments),
          "HDR environment",
          "localEnvironment"
        ).onChange(async (id2) => {
          if (id2 === globalThis.dlssLocalEnvironment) return;
          try {
            await globalThis.dlssSetLocalEnvironment?.(id2);
          } catch {
            reflect(localEnvironmentEditor, globalThis.dlssLocalEnvironment || "studio-small-08");
          }
        });
        syncRuntime();
      },
      createParameters(name) {
        return parameters.createGroup(name);
      },
      mountRuntime(state2, callbacks) {
        runtime = state2;
        actions = callbacks;
        syncRuntime();
      },
      async beforeSceneChange() {
        await actions?.beforeSceneChange?.();
        setPresented(false);
        frameTimes.dlss.length = frameTimes.source.length = 0;
        delete document.body.dataset.dlssReady;
        for (const editor of statEditors.values()) reflect(editor, "\u2014");
      },
      afterSceneChange() {
        actions?.afterSceneChange?.();
      },
      sync: syncRuntime,
      frameComplete(timings, width, height) {
        document.body.dataset.dlssReady = "true";
        recordFrame("dlss");
        if (!globalThis.dlssSceneLoading) globalThis.dlssLoading?.finish();
        const ms = (value) => Number.isFinite(value) ? `${value.toFixed(1)} ms` : "unavailable";
        Object.assign(stats, {
          resolution: `${width} \xD7 ${height}`,
          readback: ms(timings.readbackMilliseconds),
          preprocessing: ms(timings.uploadPreprocessMilliseconds),
          network: ms(timings.networkMilliseconds),
          presentation: ms(timings.presentationMilliseconds)
        });
        for (const [key2, editor] of statEditors) reflect(editor, stats[key2]);
      },
      mountSr(initialSize, setResolution, reset) {
        const settings = {
          width: initialSize[0],
          height: initialSize[1],
          apply() {
            try {
              setResolution(Number(settings.width), Number(settings.height));
              sizeHint.textContent = "Performance \xB7 preset J \xB7 2\xD7";
            } catch (error) {
              sizeHint.textContent = error.message;
            }
          },
          reset
        };
        const group = parameters.createGroup("Super resolution");
        const width = labelControl(group.add(settings, "width", 1, 4096, 1), "input width", "srWidth");
        const height = labelControl(group.add(settings, "height", 1, 4096, 1), "input height", "srHeight");
        labelControl(group.add(settings, "apply"), "Apply resolution");
        labelControl(group.add(settings, "reset"), "Reset temporal history", "srReset");
        const sizeHint = document.createElement("p");
        sizeHint.className = "demo-status";
        sizeHint.textContent = "Performance \xB7 preset J \xB7 2\xD7";
        group.paramList.domElement.append(sizeHint);
        return { sync(w, h) {
          reflect(width, w);
          reflect(height, h);
        } };
      }
    };
    globalThis.dlssDemoUi = demoUi;
    timer = setInterval(syncRuntime, 250);
    addEventListener("dlss-viewer-ready", (event) => trackViewer(event.detail));
    if (globalThis.dlssViewer) trackViewer(globalThis.dlssViewer);
    addEventListener("pagehide", () => {
      clearInterval(timer);
      trackViewer(null);
      profiler.dispose();
    }, { once: true });
    attributions = {
      "simple-lighting": ["Simple Lighting", "https://www.blendkit.com/asset-gallery-detail/2d3edff0-47f6-4bd6-9d1b-cbde69378c65/", " \xB7 Ryder Booth \xB7 Mustang by AIR3D \xB7 BlenderKit"],
      "vege-packshot": ["Vege packshot", "https://www.blendkit.com/asset-gallery-detail/ed54839b-fc24-4651-8fae-da3ac8f547a0/", " \xB7 Bart Papis \xB7 BlenderKit"],
      arunthayan: ["Arunthayan", "https://www.blendkit.com/asset-gallery-detail/7d65df92-91fc-47ad-b967-086378a87707/", " \xB7 Muhammed Ismayil \xB7 BlenderKit"],
      "selection-five": ["Cowboy Gramps", "https://www.blendkit.com/asset-gallery-detail/96dce188-9c9c-4699-a45a-48663fbbbcb7/", " \xB7 Muhammed Ismayil \xB7 CC0"],
      "selection-six": ["Village in the Highlands", "https://www.blendkit.com/asset-gallery-detail/bf6f87e6-71f6-4443-9073-4e005a05d293/", " \xB7 Ibrohim Toxirov \xB7 BlenderKit"],
      bistro: ["Amazon Lumberyard Bistro", "https://developer.nvidia.com/orca/amazon-lumberyard-bistro", " \xB7 Amazon Lumberyard \xB7 CC BY 4.0"],
      "lone-monk": ["Lone Monk", "https://blenderartists.org/t/lone-monk-cc0-scene-and-assets/1287621", " \xB7 Carlo Bergonzini / Monorender \xB7 CC0"]
    };
    addEventListener("dlss-scene-ready", updateScene);
    addEventListener("dlss-local-environment-changed", (event) => {
      if (localEnvironmentEditor) reflect(localEnvironmentEditor, event.detail.id);
      syncRuntime();
    });
    updateScene();
    syncRuntime();
  }
});

// src/backend/nr-settings.js
function normalizeNrSettings(changes = {}, previous = NR_DEFAULTS) {
  const result = { ...previous };
  for (const [key2, value] of Object.entries(changes)) {
    if (!Object.hasOwn(NR_DEFAULTS, key2)) throw new Error(`Unknown DLSS-NR setting: ${key2}`);
    if (typeof NR_DEFAULTS[key2] === "boolean") {
      if (![true, false, 0, 1].includes(value)) throw new Error(`${key2} must be a boolean`);
      result[key2] = Boolean(value);
    } else {
      if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${key2} must be finite`);
      const [min, max] = ranges[key2];
      result[key2] = Math.min(max, Math.max(min, value));
      if (key2 === "style" || key2 === "preset") result[key2] = Math.round(result[key2]);
      if (key2 === "skinStructure" && result[key2] < 0) result[key2] = -1;
    }
  }
  return result;
}
var NR_DEFAULTS, ranges, NR_STYLE_WGSL;
var init_nr_settings = __esm({
  "src/backend/nr-settings.js"() {
    NR_DEFAULTS = Object.freeze({
      enabled: true,
      intensity: 1,
      localTone: 1,
      localStructure: 1,
      skinStructure: -1,
      autoMask: true,
      style: 0,
      preset: 0,
      uiCorrection: false
    });
    ranges = {
      intensity: [0, 1],
      localTone: [0, 2],
      localStructure: [0, 2],
      skinStructure: [-1, 2],
      style: [0, 2],
      preset: [0, 3]
    };
    NR_STYLE_WGSL = String.raw`
fn nr_publish(proxy: vec3<f32>, head: vec3<f32>, intensity: f32, style: f32, tone: f32) -> vec3<f32> {
  var neural: vec3<f32>;
  for (var c = 0u; c < 3u; c++) {
    let centered = proxy[c] * 0.125 - 0.0625;
    let residual = select(0.0, head[c] * 0.03125, head[c] == head[c] && abs(head[c]) < 3.402823e38);
    let mixed = centered + residual;
    let value = clamp(mixed * 8.0 + 0.5, 0.0, 1.0);
    if (style == 0.0 && intensity < 1.0) {
      neural[c] = truncate_half(clamp(fma(intensity, value - proxy[c], proxy[c]), 0.0, 1.0));
    } else { neural[c] = truncate_half(value); }
  }
  if (style != 0.0) {
    let styled = nr_style(neural, style, tone);
    for (var c = 0u; c < 3u; c++) {
      neural[c] = truncate_half(clamp(fma(intensity, styled[c] - proxy[c], proxy[c]), 0.0, 1.0));
    }
  }
  return neural;
}
fn nr_hsl(rgb: vec3<f32>) -> vec3<f32> {
  let high = max(max(rgb.r, rgb.g), rgb.b);
  let low = min(min(rgb.r, rgb.g), rgb.b);
  let sum = high + low;
  let light = sum * 0.5;
  var hue = 0.0; var saturation = 0.0;
  if (high > low) {
    let delta = high - low;
    if (light > 0.5) { saturation = delta / ((2.0 - high) - low); }
    else { saturation = delta / sum; }
    if (high == rgb.r) {
      hue = fma(rgb.g - rgb.b, 1.0 / delta, select(0.0, 6.0, rgb.g < rgb.b)) / 6.0;
    } else if (high == rgb.g) { hue = fma(rgb.b - rgb.r, 1.0 / delta, 2.0) / 6.0; }
    else { hue = fma(rgb.r - rgb.g, 1.0 / delta, 4.0) / 6.0; }
  }
  return vec3<f32>(hue, saturation, light);
}
fn nr_hue(p: f32, q: f32, hue: f32) -> f32 {
  var h = hue;
  if (h < 0.0) { h += 1.0; }
  if (h > 1.0) { h -= 1.0; }
  if (h < bitcast<f32>(0x3e2aaaabu)) { return fma(h, (q - p) * 6.0, p); }
  if (h < 0.5) { return q; }
  if (h < bitcast<f32>(0x3f2aaaabu)) {
    return fma((bitcast<f32>(0x3f2aaaabu) - h) * (q - p), 6.0, p);
  }
  return p;
}
fn nr_rgb(hsl: vec3<f32>) -> vec3<f32> {
  if (hsl.y <= 0.0) { return vec3<f32>(hsl.z); }
  var q: f32;
  if (hsl.z < 0.5) { q = hsl.z * (hsl.y + 1.0); }
  else { q = fma(-hsl.z, hsl.y, hsl.z + hsl.y); }
  let p = (hsl.z + hsl.z) - q;
  return vec3<f32>(nr_hue(p, q, hsl.x + bitcast<f32>(0x3eaaaaabu)),
    nr_hue(p, q, hsl.x), nr_hue(p, q, hsl.x - bitcast<f32>(0x3eaaaaabu)));
}
fn nr_style(neural: vec3<f32>, style: f32, tone: f32) -> vec3<f32> {
  // Native conditioning accepts tone up to two, but cg2r caps its adjustment at one.
  let style_tone = clamp(tone, 0.0, 1.0);
  let exposure = select(0.0, -0.1 * style_tone, style == 1.0);
  let contrast = select(0.0, -0.25 * style_tone, style == 1.0);
  let saturation = select(-0.15 * style_tone, -0.1 * style_tone, style == 1.0);
  var color: vec3<f32>;
  for (var c = 0u; c < 3u; c++) {
    let value = clamp(neural[c], 0.0, 1.0);
    let exposed = clamp(value * exp2(exposure), 0.0, 1.0);
    let square = exposed * exposed;
    let curve_delta = fma(square, 3.0 - (exposed + exposed), -exposed);
    let curved = clamp(fma(contrast, curve_delta, exposed), 0.0, 1.0);
    let first_gamma = exp2(log2(curved));
    color[c] = exp2(log2(max(0.0, first_gamma)));
  }
  let hsl = nr_hsl(color);
  let adjusted = nr_rgb(vec3<f32>(hsl.x, clamp(hsl.y * (saturation + 1.0), 0.0, 1.0), hsl.z));
  let again = nr_hsl(adjusted);
  return clamp(nr_rgb(vec3<f32>(again.x, clamp(exp2(log2(again.y)), 0.0, 1.0), again.z)),
    vec3<f32>(0.0), vec3<f32>(1.0));
}
`;
  }
});

// src/runtime/nr-controls.js
function readNrSettings() {
  const query2 = new URLSearchParams(location.search);
  let settings = { ...NR_DEFAULTS };
  for (const [key2, param] of Object.entries(queryKeys)) {
    if (!query2.has(param)) continue;
    const text = query2.get(param);
    if (text.trim() === "") continue;
    try {
      settings = normalizeNrSettings({ [key2]: Number(text) }, settings);
    } catch {
    }
  }
  return settings;
}
function mountNrControls(initial, onChange) {
  const panel = demoUi.createParameters("Neural rendering");
  panel.paramList.domElement.id = "nrSettings";
  let current = initial;
  const defaultSkin = (scene) => scene === "selection-five" ? 1 : NR_DEFAULTS.skinStructure;
  const skinByScene = /* @__PURE__ */ new Map();
  const initialSkinOverride = new URLSearchParams(location.search).has("nrSkin") ? initial.skinStructure : void 0;
  let activeScene = null;
  const values = { ...initial, skinAuto: initial.skinStructure < 0, reset: () => onChange({ ...NR_DEFAULTS }) };
  const editors = /* @__PURE__ */ new Map();
  function add(group, key2, label, ...options) {
    const editor = labelControl(group.add(values, key2, ...options), label);
    editor.onChange((value) => {
      if (key2 === "skinAuto") {
        const skinStructure = value ? -1 : current.localStructure;
        if (skinStructure !== current.skinStructure) onChange({ skinStructure });
      } else if (value !== current[key2]) onChange({ [key2]: value });
    }).debounce(typeof initial[key2] === "number" ? 80 : 0);
    editors.set(key2, editor);
    return editor;
  }
  add(panel, "enabled", "enabled");
  add(panel, "style", "style", { Default: 0, Natural: 1, Cinematic: 2 });
  add(panel, "intensity", "intensity", 0, 1, 0.01);
  add(panel, "localTone", "local tone", 0, 2, 0.01);
  add(panel, "localStructure", "local structure", 0, 2, 0.01);
  add(panel, "skinStructure", "skin structure", 0, 2, 0.01);
  add(panel, "skinAuto", "skin follows structure").info("Automatically follows local structure.");
  add(panel, "autoMask", "automatic masking").info("Apply skin and general structure separately.");
  const advanced = panel.addFolder("Additional options").close();
  add(advanced, "preset", "render preset", { Default: 0, "Preset 1": 1, "Preset 2": 2, "Preset 3": 3 }).info("These presets select the same model in the current implementation.");
  add(advanced, "uiCorrection", "UI correction").info("No effect on this scene-only input.");
  labelControl(panel.add(values, "reset"), "Reset NR settings", "nrReset");
  function sync(settings) {
    current = settings;
    for (const [key2, editor] of editors) {
      const value = key2 === "skinAuto" ? settings.skinStructure < 0 : key2 === "skinStructure" && settings.skinStructure < 0 ? settings.localStructure : settings[key2];
      reflect(editor, value);
    }
    enableControl(editors.get("skinStructure"), settings.skinStructure >= 0 && settings.autoMask);
    enableControl(editors.get("skinAuto"), settings.autoMask);
    const url = new URL(location.href);
    for (const [key2, param] of Object.entries(queryKeys)) {
      const defaultValue = key2 === "skinStructure" ? defaultSkin(activeScene) : NR_DEFAULTS[key2];
      if (settings[key2] === defaultValue) url.searchParams.delete(param);
      else url.searchParams.set(param, String(typeof settings[key2] === "boolean" ? Number(settings[key2]) : settings[key2]));
    }
    history.replaceState(history.state, "", url);
    demoUi.sync();
  }
  function applySceneSkin() {
    if (!globalThis.dlssSceneReady) return;
    const scene = globalThis.dlssSceneId;
    if (!scene || scene === activeScene) return;
    if (activeScene) skinByScene.set(activeScene, current.skinStructure);
    const skinStructure = skinByScene.get(scene) ?? (activeScene === null && initialSkinOverride !== void 0 ? initialSkinOverride : defaultSkin(scene));
    activeScene = scene;
    if (skinStructure !== current.skinStructure) onChange({ skinStructure });
    else sync(current);
  }
  addEventListener("dlss-scene-ready", applySceneSkin);
  addEventListener("pagehide", () => removeEventListener("dlss-scene-ready", applySceneSkin), { once: true });
  sync(initial);
  queueMicrotask(applySceneSkin);
  return { sync };
}
var queryKeys;
var init_nr_controls = __esm({
  "src/runtime/nr-controls.js"() {
    init_nr_settings();
    init_demo_ui();
    queryKeys = {
      enabled: "nrEnabled",
      intensity: "nrIntensity",
      localTone: "nrTone",
      localStructure: "nrStructure",
      skinStructure: "nrSkin",
      autoMask: "nrAutoMask",
      style: "nrStyle",
      preset: "nrPreset",
      uiCorrection: "nrUiCorrection"
    };
  }
});

// src/runtime/viewer-convergence.js
function viewerConverged(viewer) {
  if (viewer?.getPlugin("FrameFade")?.dirty) return false;
  const progressive = viewer?.getPlugin("Progressive");
  return !progressive?.enabled || progressive.isConverged(false);
}
var init_viewer_convergence = __esm({
  "src/runtime/viewer-convergence.js"() {
  }
});

// ../src/gpu.js
async function requestDevice({ requiredLimits = {} } = {}) {
  if (!navigator.gpu) throw new Error("this browser has no WebGPU (navigator.gpu is undefined)");
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "high-performance" });
  if (!adapter) throw new Error("no WebGPU adapter; on a laptop, check that the discrete GPU is selected");
  const wanted = {
    maxStorageBufferBindingSize: adapter.limits.maxStorageBufferBindingSize,
    maxBufferSize: adapter.limits.maxBufferSize,
    maxComputeWorkgroupStorageSize: adapter.limits.maxComputeWorkgroupStorageSize,
    maxComputeInvocationsPerWorkgroup: adapter.limits.maxComputeInvocationsPerWorkgroup,
    maxComputeWorkgroupSizeX: adapter.limits.maxComputeWorkgroupSizeX,
    maxStorageBuffersPerShaderStage: adapter.limits.maxStorageBuffersPerShaderStage,
    ...requiredLimits
  };
  const requiredFeatures = ["shader-f16", "timestamp-query"].filter((f) => adapter.features.has(f));
  const device = await adapter.requestDevice({ requiredFeatures, requiredLimits: wanted });
  device.lost.then((info2) => {
    if (info2.reason !== "destroyed") console.error(`WebGPU device lost: ${info2.reason} ${info2.message}`);
  });
  device.addEventListener("uncapturederror", (event) => {
    console.error(`WebGPU ${event.error.constructor.name}: ${event.error.message}`);
  });
  return { adapter, device, info: adapter.info ?? {} };
}
async function readBack(device, buffer, byteLength) {
  const size = align(byteLength, 4);
  const staging = device.createBuffer({
    size,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
  });
  const encoder = device.createCommandEncoder();
  encoder.copyBufferToBuffer(buffer, 0, staging, 0, size);
  device.queue.submit([encoder.finish()]);
  await staging.mapAsync(GPUMapMode.READ);
  const copy = staging.getMappedRange().slice(0, byteLength);
  staging.unmap();
  staging.destroy();
  return copy;
}
async function compile(device, code, label) {
  const module = device.createShaderModule({ code, label });
  const info2 = await module.getCompilationInfo();
  const errors = info2.messages.filter((m) => m.type === "error");
  for (const message of info2.messages) {
    const where = `${label}:${message.lineNum}:${message.linePos}`;
    const line = code.split("\n")[message.lineNum - 1] ?? "";
    console[message.type === "error" ? "error" : "warn"](`${where} ${message.message}
    ${line.trim()}`);
  }
  if (errors.length) throw new Error(`${label} failed to compile: ${errors[0].message}`);
  return module;
}
var align;
var init_gpu = __esm({
  "../src/gpu.js"() {
    align = (value, to) => Math.ceil(value / to) * to;
  }
});

// ../src/geometry.js
function fieldAlignment(valid) {
  let reductions = 0;
  let size = valid;
  for (let level = 0; level < 6; ++level) {
    const half = alignUp(Math.floor((size + 1) / 2), 4);
    if (half < size) reductions += 1;
    if (level === 0 && half % 8 !== 0) reductions += 1;
    size = half;
  }
  return 1 << reductions;
}
function geometryFromValid(validWidth, validHeight) {
  const alignWidth = fieldAlignment(validWidth);
  const alignHeight = fieldAlignment(validHeight);
  let fullWidth = Math.max(320, alignUp(validWidth, alignWidth));
  let fullHeight = Math.max(320, alignUp(validHeight, alignHeight));
  if (fullWidth % (4 * alignWidth) === 0 && fullHeight % (4 * alignHeight) === 0) fullWidth += alignWidth;
  const levels = [];
  let width = fullWidth;
  let height = fullHeight;
  for (let level = 0; level < 6; ++level) {
    width = alignUp(Math.floor((width + 1) / 2), 4);
    height = alignUp(Math.floor((height + 1) / 2), 4);
    levels.push({ width, height, rows: width * height });
  }
  if (levels[0].width % 8 || levels[0].height % 8) {
    throw new Error(`unsupported size ${validWidth}x${validHeight}: level 0 (${levels[0].width}x${levels[0].height}) is not a whole number of 8-pixel windows; use at least 33 pixels on each axis`);
  }
  const vitTokens = levels[5].rows;
  return {
    validWidth,
    validHeight,
    fullWidth,
    fullHeight,
    levels,
    fullRows: fullWidth * fullHeight,
    vitTokens,
    paddedVitTokens: vitTokens + 63 & ~63
  };
}
function fusedLayout(channels, base = 0) {
  const hidden = standardHidden(channels);
  const heads = channels / 32;
  const expertFfn = channels >= 64;
  const expertCount = expertFfn ? channels / 32 : 0;
  const expandBytes = expertFfn ? expertCount * channels * 128 : channels * hidden;
  const ffnWeightBytes = expertFfn ? expandBytes + expertCount * 128 * 32 + expertCount * 32 * channels : expandBytes + hidden * channels;
  const l = { hidden, heads, expertFfn, expertCount, expand: base, contractWeights: base + expandBytes };
  l.ffnCosSkip = base + ffnWeightBytes + 16;
  l.qkv = l.ffnCosSkip + channels * 2 + 16;
  l.relative = l.qkv + channels * channels * 3;
  l.scale = l.relative + heads * 8192;
  l.projection = l.scale + alignUp(heads * 4, 16);
  l.attnCosSkip = l.projection + channels * channels;
  l.endWithoutPadding = l.attnCosSkip + channels * 2;
  return l;
}
function upsampleFusedLayout(inputChannels, channels) {
  if (inputChannels !== channels * 2) throw new Error("upsample layout expects 2x input channels");
  const hidden = standardHidden(channels);
  const heads = channels / 32;
  const narrowPadding = channels === 32 ? 16 : 0;
  const expertFfn = channels >= 64;
  const expertCount = expertFfn ? channels / 32 : 0;
  const expandBytes = expertFfn ? expertCount * channels * 128 : channels * hidden;
  const ffnWeightBytes = expertFfn ? expandBytes + expertCount * 128 * 32 + expertCount * 32 * channels : expandBytes + hidden * channels;
  const l = { hidden, heads, expertFfn, expertCount, expand: 0, contractWeights: expandBytes };
  l.upsampleWeight = ffnWeightBytes;
  l.ffnCosSkip = l.upsampleWeight + inputChannels * channels + narrowPadding;
  l.transitionScale = l.ffnCosSkip + channels * 2 + narrowPadding;
  l.qkv = l.transitionScale + channels * 2;
  l.relative = l.qkv + channels * channels * 3;
  l.scale = l.relative + heads * 8192;
  l.projection = l.scale + alignUp(heads * 4, 16);
  l.attnCosSkip = l.projection + channels * channels;
  l.endWithoutPadding = l.attnCosSkip + channels * 2;
  return l;
}
var alignUp, PHASES, windowPhase, WindowPhases, standardHidden, preFusedLayout, postFusedLayout;
var init_geometry = __esm({
  "../src/geometry.js"() {
    alignUp = (value, alignment) => Math.ceil(value / alignment) * alignment;
    PHASES = [[0, 0], [4, 4], [4, 0], [0, 4]];
    windowPhase = (index) => PHASES[index & 3];
    WindowPhases = class {
      constructor() {
        this.counters = new Int32Array(7);
      }
      take(level) {
        return this.counters[level]++;
      }
      reset() {
        this.counters.fill(0);
      }
    };
    standardHidden = (channels) => {
      if (channels === 32 || channels === 64 || channels === 128 || channels === 256) return 128;
      throw new Error(`no fused layout for ${channels} channels`);
    };
    preFusedLayout = () => ({
      hidden: 128,
      heads: 1,
      expertFfn: false,
      expertCount: 0,
      expand: 0,
      contractWeights: 4096,
      inputAdapter: 8208,
      ffnCosSkip: 9232,
      qkv: 9312,
      relative: 12384,
      scale: 20576,
      projection: 20592,
      attnCosSkip: 21616,
      endWithoutPadding: 21680
    });
    postFusedLayout = () => ({
      hidden: 128,
      heads: 1,
      expertFfn: false,
      expertCount: 0,
      expand: 0,
      contractWeights: 4096,
      ffnCosSkip: 8208,
      inputScale: 8272,
      adapterScale: 8336,
      qkv: 8400,
      relative: 11472,
      scale: 19664,
      projection: 19680,
      attnCosSkip: 20704,
      postWeights: 20784,
      endWithoutPadding: 21808
    });
  }
});

// ../src/numerics.js
function f32Bits(value) {
  scratch.setFloat32(0, value);
  return scratch.getUint32(0);
}
function roundShiftRightEven(value, shift) {
  if (shift === 0) return value >>> 0;
  if (shift > 31) return 0;
  const quotient = value >>> shift;
  const remainder = value & (1 << shift) - 1;
  const halfway = 1 << shift - 1;
  return quotient + (remainder > halfway || remainder === halfway && quotient & 1 ? 1 : 0);
}
function f16Bits(value) {
  const bits = f32Bits(value);
  const sign = bits >>> 16 & 32768;
  const exponent = bits >>> 23 & 255;
  const mantissa = bits & 8388607;
  if (exponent === 255) return sign | (mantissa ? 32256 : 31744);
  let halfExponent = exponent - 112;
  if (halfExponent >= 31) return sign | 31744;
  if (halfExponent <= 0) {
    if (halfExponent < -10) return sign;
    return sign | roundShiftRightEven(mantissa | 8388608, 14 - halfExponent);
  }
  let rounded = roundShiftRightEven(mantissa, 13);
  if (rounded === 1024) {
    rounded = 0;
    halfExponent += 1;
  }
  if (halfExponent >= 31) return sign | 31744;
  return sign | halfExponent << 10 | rounded;
}
function f16ToNumber(bits) {
  const sign = bits & 32768 ? -1 : 1;
  const exponent = bits >>> 10 & 31;
  const mantissa = bits & 1023;
  if (exponent === 0) return sign * mantissa * 2 ** -24;
  if (exponent === 31) return mantissa ? NaN : sign * Infinity;
  return sign * (1 + mantissa / 1024) * 2 ** (exponent - 15);
}
function e4m3ToNumber(byte) {
  const sign = byte & 128 ? -1 : 1;
  const exponent = byte >>> 3 & 15;
  const mantissa = byte & 7;
  if (exponent === 0) return sign * mantissa * 2 ** -9;
  if (exponent === 15 && mantissa === 7) return sign * 0;
  return sign * (1 + mantissa / 8) * 2 ** (exponent - 7);
}
var scratch, roundF16;
var init_numerics = __esm({
  "../src/numerics.js"() {
    scratch = new DataView(new ArrayBuffer(4));
    roundF16 = (value) => f16ToNumber(f16Bits(value));
  }
});

// ../src/model.js
function packedF16WeightIndex(inputChannel, outputChannel, outputChannels) {
  const nTiles = Math.ceil(outputChannels / 16);
  const tile = (inputChannel >> 4) * nTiles + (outputChannel >> 4);
  const k = inputChannel & 15, n = outputChannel & 15;
  const lane = (n & 7) << 2 | (k & 7) >> 1;
  const fragment = (k >= 8 ? 2 : 0) + (k & 1);
  return tile * 256 + lane * 8 + (n >> 3 & 1) * 4 + fragment;
}
function tiledToken(token) {
  const x = token & 7, y = token >> 3;
  return (y >> 2) * 32 + (x >> 2) * 16 + (y & 3) * 4 + (x & 3);
}
function inverseTiledToken(token) {
  const tile = token >> 4, within = token & 15;
  const x = (tile & 1) * 4 + (within & 3);
  const y = (tile >> 1) * 4 + (within >> 2);
  return y * 8 + x;
}
var Model;
var init_model = __esm({
  "../src/model.js"() {
    init_geometry();
    init_numerics();
    Model = class {
      constructor(device) {
        this.device = device;
        this.tensors = /* @__PURE__ */ new Map();
        this.buffers = /* @__PURE__ */ new Map();
        this.stages = /* @__PURE__ */ new Map();
        this.checked = /* @__PURE__ */ new Set();
        this.blockCount = 0;
        this.bytesUploaded = 0;
      }
      /**
       * Fetch the manifest and every stage file. `onProgress` is called with (loadedBytes, totalBytes) - the
       * weights are 141 MiB, which is long enough that a demo has to say something while it waits.
       */
      async load(directory, onProgress) {
        const manifest = await (await fetch(`${directory}/manifest.json`)).json();
        this.blockCount = manifest.totals.blockCount;
        const total = manifest.stages.reduce((sum, stage) => sum + stage.packedByteLength, 0);
        let loaded = 0;
        const stages = /* @__PURE__ */ new Map();
        for (const stage of manifest.stages) {
          const response = await fetch(`${directory}/model/${stage.file}`);
          if (!response.ok) throw new Error(`cannot read stage ${stage.id}`);
          const bytes = new Uint8Array(await response.arrayBuffer());
          if (bytes.byteLength !== stage.packedByteLength) throw new Error(`stage size mismatch: ${stage.id}`);
          stages.set(stage.id, bytes);
          loaded += bytes.byteLength;
          onProgress?.(loaded, total);
        }
        for (const entry of manifest.tensors) {
          const stage = stages.get(entry.stage);
          if (!stage) throw new Error(`tensor references unknown stage ${entry.stage}`);
          if (entry.stageOffset + entry.byteLength > stage.byteLength) throw new Error(`tensor exceeds stage ${entry.name}`);
          this.tensors.set(entry.name, {
            name: entry.name,
            block: entry.block,
            layer: entry.layer,
            stage: entry.stage,
            stageOffset: entry.stageOffset,
            byteLength: entry.byteLength,
            bytes: stage.subarray(entry.stageOffset, entry.stageOffset + entry.byteLength)
          });
        }
        for (const [id2, bytes] of stages) {
          const padded = new Uint8Array(alignUp(bytes.byteLength + 4, 4));
          padded.set(bytes);
          const buffer = this.device.createBuffer({
            label: `stage ${id2}`,
            size: padded.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
          });
          this.device.queue.writeBuffer(buffer, 0, padded);
          this.bytesUploaded += bytes.byteLength;
          this.stages.set(id2, buffer);
        }
        return this;
      }
      tensor(block, layer = 0, parameter = "layer") {
        const name = `block${block}.layer${layer}.${parameter}`;
        const found = this.tensors.get(name);
        if (!found) throw new Error(`missing tensor ${name}`);
        return found;
      }
      /** An f16 aux value (the per-channel skip scales) as a Number. */
      auxHalf(tensor, byteOffset, column) {
        const p = tensor.bytes;
        const at = byteOffset + column * 2;
        return p[at] | p[at + 1] << 8;
      }
      /**
       * How much of the reprojected history the temporal blend may keep, as a fraction of what the head's own
       * logit asks for. It is a learned scalar in the model, not a knob: the network was trained with it.
       */
      blendScale() {
        const tensor = this.tensor(70, 0, "blend_scale");
        if (tensor.byteLength < 2) throw new Error("the model has no blend scale");
        return f16ToNumber(tensor.bytes[0] | tensor.bytes[1] << 8);
      }
      /** An f32 aux value (the per-head attention scales). */
      auxF32(tensor, byteOffset) {
        return new DataView(tensor.bytes.buffer, tensor.bytes.byteOffset + byteOffset, 4).getFloat32(0, true);
      }
      gpuBuffer(key2, build, label) {
        const existing = this.buffers.get(key2);
        if (existing) return existing;
        const data = build();
        const buffer = this.device.createBuffer({
          label: label ?? key2,
          size: Math.max(4, alignUp(data.byteLength, 4)),
          usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });
        this.device.queue.writeBuffer(buffer, 0, data);
        this.bytesUploaded += data.byteLength;
        this.buffers.set(key2, buffer);
        return buffer;
      }
      /**
       * One FP8 matrix, where it already is. The GEMM reads the model's own fragment order, so this is a buffer
       * and a byte offset - plus the one thing the whole specialized reduction rests on, checked here because
       * this is the only place that sees the bytes: every weight satisfies |w| <= 9, which is what makes the
       * product of two operands scaled by four an exact normal half. A matrix that broke it would still produce
       * numbers, just not the right ones, so it is a throw rather than a fallback.
       */
      fp8Matrix(tensor, byteOffset, K, Nmatrix, { batchK = 0 } = {}) {
        const batch = batchK || K;
        if (K % 32 || Nmatrix % 16 || batch % 32 || K % batch) {
          throw new Error(`FP8 matrix shape must be K%32==0, N%16==0, batchK | K: ${tensor.name}`);
        }
        if (byteOffset + K * Nmatrix > tensor.byteLength) {
          throw new Error(`FP8 matrix exceeds tensor ${tensor.name}`);
        }
        const key2 = `${tensor.name}/${byteOffset}/${K}x${Nmatrix}`;
        if (!this.checked.has(key2)) {
          const bytes = tensor.bytes;
          for (let i = byteOffset; i < byteOffset + K * Nmatrix; ++i) {
            const magnitude = bytes[i] & 127;
            if (magnitude > 81 && magnitude !== 127) {
              throw new Error(`weight ${i - byteOffset} of ${tensor.name} is outside the bounded-half range`);
            }
          }
          this.checked.add(key2);
        }
        return {
          buffer: this.stage(tensor),
          byteOffset: tensor.stageOffset + byteOffset,
          k: K,
          matrixChannels: Nmatrix,
          batchK: batch
        };
      }
      stage(tensor) {
        const buffer = this.stages.get(tensor.stage);
        if (!buffer) throw new Error(`tensor ${tensor.name} has no stage buffer`);
        return buffer;
      }
      /** A plain [K][paddedN] f16 matrix, for the input adapter and the head. */
      f16Matrix(tensor, byteOffset, K, N) {
        const paddedN = alignUp(N, 16);
        const key2 = `${tensor.name}/f16/${byteOffset}/${K}x${N}`;
        const buffer = this.gpuBuffer(key2, () => {
          if (K % 16) throw new Error("f16 matrix K must be a multiple of 16");
          const plain = new Uint16Array(K * paddedN);
          for (let k = 0; k < K; ++k) {
            for (let n = 0; n < N; ++n) {
              const halfIndex = (byteOffset >> 1) + packedF16WeightIndex(k, n, N);
              if (halfIndex * 2 + 1 >= tensor.byteLength) throw new Error(`f16 matrix exceeds tensor ${key2}`);
              plain[k * paddedN + n] = tensor.bytes[halfIndex * 2] | tensor.bytes[halfIndex * 2 + 1] << 8;
            }
          }
          return plain;
        });
        return { buffer, paddedN };
      }
      /**
       * The learned attention prior as f16 [heads][64 query][64 key], both tokens in natural row-major order
       * within the window. The model stores it as the C accumulator of the score matrix multiply, so both axes
       * arrive in 4x4-tiled order inside 16x16 fragments; the kernel wants to index it by the token coordinates
       * it already has, so the untangling happens once, here.
       */
      relativeBias(tensor, relativeByteOffset, heads) {
        const key2 = `${tensor.name}/prior/${relativeByteOffset}/${heads}`;
        return this.gpuBuffer(key2, () => {
          const prior = new Uint16Array(heads * 64 * 64);
          for (let head = 0; head < heads; ++head) {
            for (let query2 = 0; query2 < 64; ++query2) {
              const q = tiledToken(query2);
              for (let k = 0; k < 64; ++k) {
                const m = q & 15, n = k & 15;
                const lane = (m & 7) << 2 | (n & 7) >> 1;
                const fragment = (m >= 8 ? 2 : 0) + (n & 1);
                const halfIndex = (q >> 4) * 1024 + (k >> 4) * 256 + lane * 8 + (n >> 3) * 4 + fragment;
                const byteIndex = relativeByteOffset + head * 8192 + halfIndex * 2;
                if (byteIndex + 1 >= tensor.byteLength) throw new Error(`relative bias exceeds tensor ${key2}`);
                prior[(head * 64 + query2) * 64 + inverseTiledToken(k)] = tensor.bytes[byteIndex] | tensor.bytes[byteIndex + 1] << 8;
              }
            }
          }
          return prior;
        });
      }
      /** The per-head f32 attention scales, as their own small buffer. */
      headScales(tensor, byteOffset, heads) {
        const key2 = `${tensor.name}/heads/${byteOffset}/${heads}`;
        return this.gpuBuffer(key2, () => {
          const view = new DataView(tensor.bytes.buffer, tensor.bytes.byteOffset);
          const values = new Float32Array(heads);
          for (let h = 0; h < heads; ++h) values[h] = view.getFloat32(byteOffset + h * 4, true);
          return values;
        });
      }
      /** Two per-channel scale vectors end to end, for the post blend, which reads both. */
      auxPair(tensor, offsetA, offsetB, count) {
        const key2 = `${tensor.name}/auxpair/${offsetA}/${offsetB}/${count}`;
        return this.gpuBuffer(key2, () => {
          const values = new Uint16Array(count * 2);
          for (let i = 0; i < count; ++i) {
            values[i] = this.auxHalf(tensor, offsetA, i);
            values[count + i] = this.auxHalf(tensor, offsetB, i);
          }
          return values;
        });
      }
      /** The per-channel skip scales of one tensor slice, as a half buffer the kernel indexes by column. */
      auxVector(tensor, byteOffset, count) {
        const key2 = `${tensor.name}/aux/${byteOffset}/${count}`;
        return this.gpuBuffer(key2, () => {
          const values = new Uint16Array(count);
          for (let i = 0; i < count; ++i) values[i] = this.auxHalf(tensor, byteOffset, i);
          return values;
        });
      }
      /** The same scales, as the GEMM wants them: an offset into the stage buffer its weights already come from. */
      auxOffset(tensor, byteOffset, count) {
        if (byteOffset % 2) throw new Error(`skip scales of ${tensor.name} are not half-aligned`);
        if (byteOffset + count * 2 > tensor.byteLength) throw new Error(`skip scales exceed ${tensor.name}`);
        return tensor.stageOffset + byteOffset;
      }
      destroy() {
        for (const buffer of this.buffers.values()) buffer.destroy();
        for (const buffer of this.stages.values()) buffer.destroy();
        this.buffers.clear();
        this.stages.clear();
      }
    };
  }
});

// ../src/matmul/pipeline-compiler.js
function id(value) {
  if (value == null || typeof value !== "object" && typeof value !== "function") return String(value);
  if (!objectIds.has(value)) objectIds.set(value, nextId++);
  return objectIds.get(value);
}
function compileComputePipeline(device, descriptor) {
  let compiler = compilers.get(device);
  if (!compiler) {
    compilers.set(device, compiler = {
      active: 0,
      jobs: [],
      cache: /* @__PURE__ */ new Map(),
      concurrency: Math.max(2, Math.min(8, Math.floor((globalThis.navigator?.hardwareConcurrency ?? 4) / 2)))
    });
  }
  const key2 = descriptor.compute ? `${id(descriptor.compute.module)}:${id(descriptor.layout)}:${descriptor.compute.entryPoint}:` + JSON.stringify(Object.entries(descriptor.compute.constants ?? {}).sort()) : null;
  if (key2 && compiler.cache.has(key2)) return compiler.cache.get(key2);
  const task = new Promise((resolve, reject) => {
    compiler.jobs.push({ descriptor, resolve, reject });
    pump(device, compiler);
  });
  if (key2) {
    compiler.cache.set(key2, task);
    task.catch(() => {
      if (compiler.cache.get(key2) === task) compiler.cache.delete(key2);
    });
  }
  return task;
}
function pump(device, compiler) {
  while (compiler.active < compiler.concurrency && compiler.jobs.length) {
    const job = compiler.jobs.shift();
    compiler.active += 1;
    Promise.resolve().then(() => device.createComputePipelineAsync(job.descriptor)).then(job.resolve, job.reject).finally(() => {
      compiler.active -= 1;
      pump(device, compiler);
    });
  }
}
var compilers, objectIds, nextId;
var init_pipeline_compiler = __esm({
  "../src/matmul/pipeline-compiler.js"() {
    compilers = /* @__PURE__ */ new WeakMap();
    objectIds = /* @__PURE__ */ new WeakMap();
    nextId = 1;
  }
});

// ../src/window/base.js
function windowBaseCode() {
  return WINDOW_BASE_WGSL;
}
var WINDOW_BASE_WGSL;
var init_base = __esm({
  "../src/window/base.js"() {
    WINDOW_BASE_WGSL = String.raw`
struct WindowParams {
  tokens: u32, heads: u32, width: u32, height: u32,
  channels: u32, shift_x: u32, shift_y: u32, use_relative_bias: u32,
}

@group(0) @binding(0) var<uniform> attention_params: WindowParams;
@group(0) @binding(1) var<storage, read> attention_qkv: array<f16>;      // raw half QKV [tokens][channels*3]
@group(0) @binding(2) var<storage, read> attention_scales: array<f32>;   // the learned per-head scale
@group(0) @binding(3) var<storage, read> attention_prior: array<f16>;    // [heads][64 query][64 key]
@group(0) @binding(6) var<storage, read_write> attention_output: array<u32>;   // E4M3 [tokens][channels]

fn round_attention_half(value: f32) -> f32 { return round_f16(value); }

/** The E4M3 publication as a value, for the operands that stay in registers. */
fn publish_fp8(value: f32) -> f32 { return decode_e4m3(encode_e4m3(f16_bits(value))); }

/** The same publication as the byte the output tensor stores. */
fn publish_e4_code(value: f32) -> u32 { return encode_e4m3(f16_bits(value)); }

fn native_exp_weight(score: f16) -> f16 { return f16(exp_weight(f32(score))); }

// Both operands are halves, so their product is exact in f32 and the single rounding here is the fused
// multiply-add's own. This is the pair fold the normalization's square sum is specified with.
fn nr_norm_fma(a: f16, b: f16, c: f16) -> f16 { return f16(f32(a) * f32(b) + f32(c)); }

/** Physical (4x4-tiled) token -> natural row-major token inside an 8x8 window. */
fn inverse_tiled_token(token: u32) -> u32 {
  let tile = token >> 4u;
  let within = token & 15u;
  let x = (tile & 1u) * 4u + (within & 3u);
  let y = (tile >> 1u) * 4u + (within >> 2u);
  return y * 8u + x;
}

// The learned prior is the C accumulator of the score matrix multiply, so the model stores it as 16x16
// accumulator tiles rather than as a matrix. src/model.js untangles that once, into natural query and key.
fn load_relative_bias(head: u32, query: u32, key: u32) -> f32 {
  return f32(attention_prior[(head * 64u + query) * 64u + key]);
}
`;
  }
});

// ../src/window/tiled.js
var TILED_WINDOW_WGSL;
var init_tiled = __esm({
  "../src/window/tiled.js"() {
    TILED_WINDOW_WGSL = String.raw`
var<workgroup> tiled_q: array<f16, 256>;
var<workgroup> tiled_k: array<f16, 2048>;
var<workgroup> tiled_v: array<f16, 2048>;
var<workgroup> tiled_scores: array<f16, 512>;
var<workgroup> tiled_reciprocals: array<f16, 8>;

fn tiled_qk(query: u32, key: u32, start: u32, accumulator: f32) -> f32 {
  var exponent = -21;
  if (accumulator != 0.0) { exponent = f16_exponent(accumulator); }
  for (var c = start; c < start + 16u; c++) {
    let q = f32(tiled_q[query * 32u + c]);
    let k = f32(tiled_k[c * 64u + key]);
    if (q != 0.0 && k != 0.0) { exponent = max(exponent, e4m3_exponent(q) + e4m3_exponent(k)); }
  }
  let alignment = bitcast<f32>(u32(140 - exponent) << 23u);
  var sum = i32(trunc(accumulator * alignment));
  for (var c = start; c < start + 16u; c++) {
    let q = f32(tiled_q[query * 32u + c]);
    let k = f32(tiled_k[c * 64u + key]);
    sum += i32(trunc((q * k) * alignment));
  }
  return round_attention_half(f32(sum) * bitcast<f32>(u32(exponent + 114) << 23u));
}

fn tiled_score(query: u32, index: u32) -> f16 {
  return tiled_scores[query * 64u + inverse_tiled_token(index)];
}

fn tiled_softmax_pair(query: u32, pair: u32, parity: u32) -> f16 {
  let key = pair * 2u + parity;
  let blocks01 = tiled_score(query, key) + tiled_score(query, key + 8u);
  let blocks23 = tiled_score(query, key + 16u) + tiled_score(query, key + 24u);
  let blocks45 = tiled_score(query, key + 32u) + tiled_score(query, key + 40u);
  let blocks67 = tiled_score(query, key + 48u) + tiled_score(query, key + 56u);
  return ((blocks01 + blocks23) + blocks45) + blocks67;
}

fn tiled_softmax_sum(query: u32) -> f16 {
  let even = ((tiled_softmax_pair(query, 0u, 0u) + tiled_softmax_pair(query, 1u, 0u))
    + tiled_softmax_pair(query, 2u, 0u)) + tiled_softmax_pair(query, 3u, 0u);
  let odd = ((tiled_softmax_pair(query, 0u, 1u) + tiled_softmax_pair(query, 1u, 1u))
    + tiled_softmax_pair(query, 2u, 1u)) + tiled_softmax_pair(query, 3u, 1u);
  return even + odd;
}

fn tiled_value(query: u32, component: u32, start: u32, accumulator: f32) -> f32 {
  var exponent = -21;
  if (accumulator != 0.0) { exponent = f16_exponent(accumulator); }
  for (var c = start; c < start + 16u; c++) {
    let key = inverse_tiled_token(c);
    let weight = f32(tiled_scores[query * 64u + key]);
    let v = f32(tiled_v[key * 32u + component]);
    if (weight != 0.0 && v != 0.0) { exponent = max(exponent, e4m3_exponent(weight) + e4m3_exponent(v)); }
  }
  let alignment = bitcast<f32>(u32(140 - exponent) << 23u);
  var sum = i32(trunc(accumulator * alignment));
  for (var c = start; c < start + 16u; c++) {
    let key = inverse_tiled_token(c);
    let weight = f32(tiled_scores[query * 64u + key]);
    let v = f32(tiled_v[key * 32u + component]);
    sum += i32(trunc((weight * v) * alignment));
  }
  return round_attention_half(f32(sum) * bitcast<f32>(u32(exponent + 114) << 23u));
}

@compute @workgroup_size(64)
fn attend_window_tiled(@builtin(local_invocation_index) lane: u32,
  @builtin(workgroup_id) gid: vec3<u32>) {
  let windows_x = (attention_params.width + attention_params.shift_x + 7u) / 8u;
  let windows_y = (attention_params.height + attention_params.shift_y + 7u) / 8u;
  let task = gid.y + gid.z * 65535u;
  if (task >= windows_x * windows_y * 8u) { return; }
  let window = task / 8u;
  let query_row = task % 8u;
  let wx = i32((window % windows_x) * 8u) - i32(attention_params.shift_x);
  let wy = i32((window / windows_x) * 8u) - i32(attention_params.shift_y);
  let qy = wy + i32(query_row);
  if (qy < 0 || qy >= i32(attention_params.height)) { return; }
  let head = gid.x;
  for (var linear = lane; linear < 2048u; linear += 64u) {
    let key = linear / 32u;
    let component = linear % 32u;
    let x = wx + i32(key & 7u);
    let y = wy + i32(key >> 3u);
    var k = 0.0h;
    var v = 0.0h;
    if (x >= 0 && y >= 0 && x < i32(attention_params.width) && y < i32(attention_params.height)) {
      let base = (u32(y) * attention_params.width + u32(x)) * attention_params.channels * 3u
        + head * 96u + component;
      k = f16(attention_qkv[base + 32u]);
      v = f16(attention_qkv[base + 64u]);
    }
    tiled_k[component * 64u + key] = k;
    tiled_v[linear] = v;
  }
  for (var linear = lane; linear < 256u; linear += 64u) {
    let x = wx + i32(linear / 32u);
    var q = 0.0h;
    if (x >= 0 && x < i32(attention_params.width)) {
      let base = (u32(qy) * attention_params.width + u32(x)) * attention_params.channels * 3u
        + head * 96u + linear % 32u;
      q = f16(attention_qkv[base]);
    }
    tiled_q[linear] = q;
  }
  workgroupBarrier();
  // Every invocation owns one key; all 64 keys execute concurrently.
  for (var query = 0u; query < 8u; query++) {
    var prior = 0.0;
    if (attention_params.use_relative_bias != 0u) {
      prior = load_relative_bias(head, query_row * 8u + query, lane);
    }
    var score = tiled_qk(query, lane, 0u, prior);
    score = tiled_qk(query, lane, 16u, score);
    tiled_scores[query * 64u + lane] = native_exp_weight(f16(score));
  }
  workgroupBarrier();
  if (lane < 8u) { tiled_reciprocals[lane] = f16(1.0 / f32(tiled_softmax_sum(lane))); }
  workgroupBarrier();
  for (var query = 0u; query < 8u; query++) {
    let weight = tiled_scores[query * 64u + lane] * tiled_reciprocals[query];
    tiled_scores[query * 64u + lane] = f16(publish_fp8(f32(weight)));
  }
  workgroupBarrier();
  for (var linear = lane; linear < 256u; linear += 64u) {
    let query = linear / 32u;
    let component = linear % 32u;
    var value = 0.0;
    for (var group = 0u; group < 4u; group++) {
      value = tiled_value(query, component, group * 16u, value);
    }
    let qx = wx + i32(query);
    if (qx >= 0 && qx < i32(attention_params.width)) {
      let index = (u32(qy) * attention_params.width + u32(qx)) * attention_params.channels
        + head * 32u + component;
      attention_output[index] = publish_fp8(value);
    }
  }
}
`;
  }
});

// ../src/window/packed.js
function packedWindowCode(code) {
  code = `var<workgroup> packed_q: array<u32, 64>;
var<workgroup> packed_k: array<u32, 512>;
var<workgroup> packed_v: array<u32, 512>;
var<workgroup> packed_scores: array<u32, 128>;
fn packed_window_exponents(v: vec4<f32>) -> u32 {
  let exponents = vec4<i32>(e4m3_exponent(v.x), e4m3_exponent(v.y),
    e4m3_exponent(v.z), e4m3_exponent(v.w));
  let bytes = select(vec4<u32>(0), vec4<u32>(exponents + vec4<i32>(106)), v != vec4<f32>(0));
  return bytes.x | (bytes.y << 8u) | (bytes.z << 16u) | (bytes.w << 24u);
}
fn maximum_window_exponent(current: u32, packed: u32) -> u32 {
  return max(max(max(max(current, packed & 255u), (packed >> 8u) & 255u),
    (packed >> 16u) & 255u), packed >> 24u);
}
` + code;
  for (const [name, left, right] of [
    ["tiled_qk", "packed_q[query * 8u + c]", "packed_k[c * 64u + key]"],
    ["tiled_value", "packed_scores[query * 16u + c]", "packed_v[c * 32u + component]"]
  ]) {
    const start = code.indexOf("  var exponent = -21;", code.indexOf(`fn ${name}(`));
    const end = code.indexOf("  let alignment", start);
    if (start < 0 || end < 0) throw new Error(`Missing ${name} exponent scan`);
    code = code.slice(0, start) + `  var maximum = 191u;
  if (accumulator != 0.0) { maximum = u32(f16_exponent(accumulator) + 212); }
  for (var c = start / 4u; c < (start + 16u) / 4u; c++) {
    maximum = maximum_window_exponent(maximum, ${left} + ${right});
  }
  let exponent = i32(maximum) - 212;
` + code.slice(end);
  }
  const scoreStart = code.indexOf("  // Every invocation owns one key;");
  if (scoreStart < 0) throw new Error("Missing window score phase");
  code = code.slice(0, scoreStart) + `  for (var linear = lane; linear < 512u; linear += 64u) {
    let key = linear % 64u;
    let first = (linear / 64u) * 4u;
    packed_k[linear] = packed_window_exponents(vec4<f32>(vec4<f16>(
      tiled_k[first * 64u + key], tiled_k[(first + 1u) * 64u + key],
      tiled_k[(first + 2u) * 64u + key], tiled_k[(first + 3u) * 64u + key])));
    let component = linear % 32u;
    let c = (linear / 32u) * 4u;
    packed_v[linear] = packed_window_exponents(vec4<f32>(vec4<f16>(
      tiled_v[inverse_tiled_token(c) * 32u + component],
      tiled_v[inverse_tiled_token(c + 1u) * 32u + component],
      tiled_v[inverse_tiled_token(c + 2u) * 32u + component],
      tiled_v[inverse_tiled_token(c + 3u) * 32u + component])));
  }
  packed_q[lane] = packed_window_exponents(vec4<f32>(vec4<f16>(tiled_q[lane * 4u],
    tiled_q[lane * 4u + 1u], tiled_q[lane * 4u + 2u], tiled_q[lane * 4u + 3u])));
  workgroupBarrier();
` + code.slice(scoreStart);
  const valueStart = code.lastIndexOf("  for (var linear = lane; linear < 256u; linear += 64u) {");
  if (valueStart < 0) throw new Error("Missing window value phase");
  return code.slice(0, valueStart) + `  for (var linear = lane; linear < 128u; linear += 64u) {
    let query = linear / 16u;
    let c = (linear % 16u) * 4u;
    packed_scores[linear] = packed_window_exponents(vec4<f32>(vec4<f16>(
      tiled_score(query, c), tiled_score(query, c + 1u),
      tiled_score(query, c + 2u), tiled_score(query, c + 3u))));
  }
  workgroupBarrier();
` + code.slice(valueStart);
}
var init_packed = __esm({
  "../src/window/packed.js"() {
  }
});

// ../src/window/multirow.js
function multirowWindowCode(code, queries) {
  if (![16, 32, 64].includes(queries)) throw new Error("Unsupported window query tile");
  const tiles = 64 / queries;
  code = code.replace("tiled_q: array<f16, 256>", `tiled_q: array<f16, ${queries * 32}>`).replace("tiled_scores: array<f16, 512>", `tiled_scores: array<f16, ${queries * 64}>`).replace("tiled_reciprocals: array<f16, 8>", `tiled_reciprocals: array<f16, ${queries}>`).replace("packed_q: array<u32, 64>", `packed_q: array<u32, ${queries * 8}>`).replace("packed_scores: array<u32, 128>", `packed_scores: array<u32, ${queries * 16}>`).replace("@workgroup_size(64)", "@workgroup_size(256)").replace("windows_x * windows_y * 8u", `windows_x * windows_y * ${tiles}u`).replace("let window = task / 8u;", `let window = task / ${tiles}u;`).replace("let query_row = task % 8u;", `let query_origin = (task % ${tiles}u) * ${queries}u;`).replace("  let qy = wy + i32(query_row);\n  if (qy < 0 || qy >= i32(attention_params.height)) { return; }\n", "").replaceAll("linear += 64u", "linear += 256u").replaceAll("linear < 256u", `linear < ${queries * 32}u`).replace(
    "let x = wx + i32(linear / 32u);",
    "let query = query_origin + linear / 32u;\n    let x = wx + i32(query % 8u);\n    let qy = wy + i32(query / 8u);"
  ).replace(
    "if (x >= 0 && x < i32(attention_params.width)) {",
    "if (x >= 0 && x < i32(attention_params.width) && qy >= 0 && qy < i32(attention_params.height)) {"
  ).replace("  packed_q[lane] =", `  for (var lane = lane; lane < ${queries * 8}u; lane += 256u) {
  packed_q[lane] =`).replace("tiled_q[lane * 4u + 3u])));", "tiled_q[lane * 4u + 3u])));\n  }").replaceAll(
    "for (var query = 0u; query < 8u; query++) {",
    `for (var linear = lane; linear < ${queries * 64}u; linear += 256u) {
    let query = linear / 64u;
    let key = linear % 64u;`
  ).replace("query_row * 8u + query, lane", "query_origin + query, key").replaceAll("tiled_qk(query, lane,", "tiled_qk(query, key,").replaceAll("tiled_scores[query * 64u + lane]", "tiled_scores[query * 64u + key]").replace("if (lane < 8u)", `if (lane < ${queries}u)`).replace("linear < 128u", `linear < ${queries * 16}u`).replace(
    "let qx = wx + i32(query);",
    "let qx = wx + i32((query_origin + query) % 8u);\n    let qy = wy + i32((query_origin + query) / 8u);"
  ).replace(
    "if (qx >= 0 && qx < i32(attention_params.width)) {",
    "if (qx >= 0 && qx < i32(attention_params.width) && qy >= 0 && qy < i32(attention_params.height)) {"
  );
  return code;
}
var init_multirow = __esm({
  "../src/window/multirow.js"() {
  }
});

// ../src/window/vector-loads.js
function vectorWindowCode(code, queries) {
  code = code.replace(/var<workgroup> tiled_[qkv]: array<f16, \d+>;\n/g, "");
  code = `var<workgroup> vector_q: array<vec4<f16>, ${queries * 8}>;
var<workgroup> vector_k: array<vec4<f16>, 576>;
var<workgroup> vector_v: array<vec4<f16>, 544>;
var<workgroup> vector_scores: array<vec4<f16>, ${queries * 16}>;
` + code;
  for (const [name, left, right] of [
    ["tiled_qk", "vector_q[query * 8u + c]", "vector_k[key * 9u + c]"],
    ["tiled_value", "vector_scores[query * 16u + c]", "vector_v[component * 17u + c]"]
  ]) {
    const begin2 = code.indexOf("  for (var c = start; c < start + 16u; c++) {", code.indexOf(`fn ${name}(`));
    const end2 = code.indexOf("  return round_attention_half", begin2);
    if (begin2 < 0 || end2 < 0) throw new Error(`Missing ${name} product loop`);
    const terms = [..."xyzw"].map((p) => `    sum += i32(trunc((a.${p} * b.${p}) * alignment));`).join("\n");
    code = code.slice(0, begin2) + `  for (var c = start / 4u; c < (start + 16u) / 4u; c++) {
    let a = vec4<f32>(${left});
    let b = vec4<f32>(${right});
${terms}
  }
` + code.slice(end2);
  }
  const begin = code.indexOf("  for (var linear = lane; linear < 2048u;", code.indexOf("fn attend_window_tiled"));
  const end = code.indexOf("  // Every invocation owns one key;", begin);
  if (begin < 0 || end < 0) throw new Error("Missing window cache loading");
  const kvParts = [..."xyzw"].map((p, i) => `
    {
      let token = inverse_tiled_token(first + ${i}u);
      let vx = wx + i32(token % 8u); let vy = wy + i32(token / 8u);
      if (vx >= 0 && vy >= 0 && vx < i32(attention_params.width) && vy < i32(attention_params.height)) {
        v.${p} = f16(attention_qkv[(u32(vy) * attention_params.width + u32(vx)) * attention_params.channels * 3u
          + head * 96u + 64u + component]);
      }
    }`).join("");
  const loadQuad = (name, base) => [..."xyzw"].map((p, i) => `      ${name}.${p} = f16(attention_qkv[${base} + ${i}u]);`).join("\n");
  code = code.slice(0, begin) + `  for (var linear = lane; linear < 512u; linear += 256u) {
    let key = linear % 64u; let c = linear / 64u;
    let x = wx + i32(key % 8u); let y = wy + i32(key / 8u);
    var k = vec4<f16>(0);
    if (x >= 0 && y >= 0 && x < i32(attention_params.width) && y < i32(attention_params.height)) {
      let base = (u32(y) * attention_params.width + u32(x)) * attention_params.channels * 3u
        + head * 96u + 32u + c * 4u;
${loadQuad("k", "base")}
    }
    vector_k[key * 9u + c] = k;
    packed_k[linear] = packed_window_exponents(vec4<f32>(k));
    let component = linear % 32u; let first = (linear / 32u) * 4u;
    var v = vec4<f16>(0);
${kvParts}
    vector_v[component * 17u + first / 4u] = v;
    packed_v[linear] = packed_window_exponents(vec4<f32>(v));
  }
  for (var linear = lane; linear < ${queries * 8}u; linear += 256u) {
    let query = query_origin + linear / 8u;
    let x = wx + i32(query % 8u); let y = wy + i32(query / 8u);
    var q = vec4<f16>(0);
    if (x >= 0 && y >= 0 && x < i32(attention_params.width) && y < i32(attention_params.height)) {
      let base = (u32(y) * attention_params.width + u32(x)) * attention_params.channels * 3u
        + head * 96u + (linear % 8u) * 4u;
${loadQuad("q", "base")}
    }
    vector_q[linear] = q;
    packed_q[linear] = packed_window_exponents(vec4<f32>(q));
  }
  workgroupBarrier();
` + code.slice(end);
  return code.replace(`    packed_scores[linear] = packed_window_exponents(vec4<f32>(vec4<f16>(
      tiled_score(query, c), tiled_score(query, c + 1u),
      tiled_score(query, c + 2u), tiled_score(query, c + 3u))));`, `    let scores = vec4<f16>(tiled_score(query, c), tiled_score(query, c + 1u),
      tiled_score(query, c + 2u), tiled_score(query, c + 3u));
    vector_scores[linear] = scores;
    packed_scores[linear] = packed_window_exponents(vec4<f32>(scores));`);
}
var init_vector_loads = __esm({
  "../src/window/vector-loads.js"() {
  }
});

// ../src/window/compact-scores.js
function compactScoreWindowCode(code, queries, threads = 256) {
  code = code.replace(/var<workgroup> tiled_scores: array<f16, \d+>;\n/, "").replace(
    "return tiled_scores[query * 64u + inverse_tiled_token(index)];",
    "return vector_scores[query * 16u + index / 4u][index % 4u];"
  );
  const begin = code.indexOf("  // Every invocation owns one key;");
  const end = code.indexOf("  workgroupBarrier();", begin);
  if (begin < 0 || end < 0) throw new Error("Missing window score phase");
  const terms = [..."xyzw"].map((p, i) => `    {
      let key = inverse_tiled_token(first + ${i}u);
      var prior = 0.0;
      if (attention_params.use_relative_bias != 0u) { prior = load_relative_bias(head, query_origin + query, key); }
      let low = tiled_qk(query, key, 0u, prior);
      score.${p} = native_exp_weight(f16(tiled_qk(query, key, 16u, low)));
    }`).join("\n");
  code = code.slice(0, begin) + `  for (var linear = lane; linear < ${queries * 16}u; linear += 256u) {
    let query = linear / 16u; let first = (linear % 16u) * 4u;
    var score = vec4<f16>(0);
${terms}
    vector_scores[linear] = score;
  }
` + code.slice(end);
  const weight = code.indexOf("    let weight = tiled_scores[");
  const normalizeStart = code.lastIndexOf("  for (var linear = lane;", weight);
  const cache = code.indexOf("    let scores = vec4<f16>(tiled_score", weight);
  const cacheEnd = code.indexOf("  workgroupBarrier();", cache);
  if (weight < 0 || normalizeStart < 0 || cache < 0 || cacheEnd < 0) throw new Error("Missing normalized score publication");
  const quantize = [..."xyzw"].map((p) => `    normalized.${p} = f16(publish_fp8(f32(weight.${p})));`).join("\n");
  code = code.slice(0, normalizeStart) + `  for (var linear = lane; linear < ${queries * 16}u; linear += 256u) {
    let weight = vector_scores[linear] * vec4<f16>(tiled_reciprocals[linear / 16u]);
    var normalized = vec4<f16>(0);
${quantize}
    vector_scores[linear] = normalized;
    packed_scores[linear] = packed_window_exponents(vec4<f32>(normalized));
  }
` + code.slice(cacheEnd);
  code = code.replace(/var<workgroup> packed_q: array<u32, \d+>;\n/, "").replaceAll("packed_q[", "packed_scores[").replace("var<workgroup> packed_v: array<u32, 512>;\n", "").replace("    packed_v[linear] = packed_window_exponents(vec4<f32>(v));\n", "").replaceAll("packed_v[", "packed_k[");
  const publish = code.indexOf("    let weight = vector_scores[linear]");
  const publishStart = code.lastIndexOf("  for (var linear = lane;", publish);
  code = code.slice(0, publishStart) + `  for (var linear = lane; linear < 512u; linear += 256u) {
    let component = linear % 32u; let c = linear / 32u;
    packed_k[linear] = packed_window_exponents(vec4<f32>(vector_v[component * 17u + c]));
  }
` + code.slice(publishStart);
  return code.replace("@workgroup_size(256)", `@workgroup_size(${threads})`).replaceAll("linear += 256u", `linear += ${threads}u`);
}
var init_compact_scores = __esm({
  "../src/window/compact-scores.js"() {
  }
});

// ../src/window/float-sum.js
function floatSumWindowCode(code) {
  for (const name of ["tiled_qk", "tiled_value"]) {
    const start = code.indexOf(`fn ${name}(`);
    const end = code.indexOf("\n}", start) + 2;
    if (start < 0 || end < 2) throw new Error(`Missing ${name}`);
    const body = code.slice(start, end).replaceAll(/i32\(trunc\(([^;]*?)\)\)/g, "trunc($1)").replace("f32(sum)", "select(sum, 0.0, sum == 0.0)");
    code = code.slice(0, start) + body + code.slice(end);
  }
  return code;
}
var init_float_sum = __esm({
  "../src/window/float-sum.js"() {
  }
});

// ../src/window/half-value.js
function halfValueWindowCode(code) {
  const start = code.indexOf("fn tiled_value(");
  const end = code.indexOf("\n}", start) + 2;
  if (start < 0 || end < 2) throw new Error("Missing window value reduction");
  let body = code.slice(start, end).replace(
    "  var sum = trunc(accumulator * alignment);",
    "  var sum = trunc(accumulator * alignment);\n  let product_alignment = bitcast<f32>(u32(136 - exponent) << 23u);"
  );
  const terms = body.indexOf("    let a = vec4<f32>(vector_scores");
  const termsEnd = body.indexOf("\n  }", terms);
  if (terms < 0 || termsEnd < 0) throw new Error("Missing vector value products");
  body = body.slice(0, terms) + `    let product = vec4<f32>(vector_scores[query * 16u + c]
      * vector_v[component * 17u + c]);
${[..."xyzw"].map((p) => `    sum += trunc(product.${p} * product_alignment);`).join("\n")}` + body.slice(termsEnd);
  code = code.slice(0, start) + body + code.slice(end);
  return code.replace(
    "    vector_scores[linear] = normalized;",
    "    vector_scores[linear] = normalized * vec4<f16>(4);"
  ).replace(
    "    packed_k[linear] = packed_window_exponents(vec4<f32>(vector_v[component * 17u + c]));",
    `    let v = vector_v[component * 17u + c];
    packed_k[linear] = packed_window_exponents(vec4<f32>(v));
    vector_v[component * 17u + c] = v * vec4<f16>(4);`
  );
}
var init_half_value = __esm({
  "../src/window/half-value.js"() {
  }
});

// ../src/window/unrolled.js
function unrolledWindowCode(code) {
  for (const [name, starts] of [["tiled_qk", [0, 16]], ["tiled_value", [0, 16, 32, 48]]]) {
    const begin = code.indexOf(`fn ${name}(`), end = code.indexOf("\n}", begin) + 2;
    if (begin < 0 || end < 2) throw new Error(`Missing ${name}`);
    const original = code.slice(begin, end), specialized = [];
    for (const start of starts) {
      let body = original.replace(`fn ${name}(`, `fn ${name}_${start}(`).replace("start: u32, ", "");
      const loop = "  for (var c = start / 4u; c < (start + 16u) / 4u; c++) {";
      while (body.includes(loop)) {
        const a = body.indexOf(loop), b = body.indexOf("\n  }", a) + 4;
        if (b < 4) throw new Error("Missing window reduction loop end");
        const terms = body.slice(a + loop.length, b - 4);
        body = body.slice(0, a) + Array.from({ length: 4 }, (_, i) => `  {
    let c = ${start / 4 + i}u;${terms}
  }`).join("\n") + body.slice(b);
      }
      specialized.push(body);
    }
    const other = name === "tiled_qk" ? "key" : "component";
    const dispatch = `fn ${name}(query:u32, ${other}:u32, start:u32, accumulator:f32)->f32 {
` + starts.slice(0, -1).map((s) => `  if(start==${s}u){return ${name}_${s}(query,${other},accumulator);}`).join("\n") + `
  return ${name}_${starts.at(-1)}(query,${other},accumulator);
}`;
    code = code.slice(0, begin) + specialized.join("\n") + "\n" + dispatch + code.slice(end);
  }
  return code;
}
var init_unrolled = __esm({
  "../src/window/unrolled.js"() {
  }
});

// ../src/window/rotate-exponent.js
function rotateExponentWindowCode(code) {
  const begin = code.indexOf("fn maximum_window_exponent("), end = code.indexOf("\n}", begin) + 2;
  if (begin < 0 || end < 2) throw new Error("Missing packed window maximum");
  return code.slice(0, begin) + `fn maximum_window_exponent(current: u32, packed: u32) -> u32 {
  let rotated8 = (packed << 8u) | (packed >> 24u);
  let rotated16 = (packed << 16u) | (packed >> 16u);
  let rotated24 = (packed << 24u) | (packed >> 8u);
  return max(current, max(max(packed, rotated8), max(rotated16, rotated24)) >> 24u);
}` + code.slice(end);
}
var init_rotate_exponent = __esm({
  "../src/window/rotate-exponent.js"() {
  }
});

// ../src/window/normalize-fused.js
function fusedNormalizeWindowCode(code, threads = 256) {
  code = `var<workgroup> window_norms: array<vec2<f16>, 64>;
` + code;
  const loads = [0, 8, 16, 24].map((offset) => `
      q${offset} = f16(attention_qkv[base + ${offset}u]);
      k${offset} = f16(attention_qkv[base + ${32 + offset}u]);`).join("");
  code = code.replace("  let head = gid.x;", `  let head = gid.x;
  for (var first = 0u; first < 64u; first += ${threads / 8}u) {
    let token = first + lane / 8u; let component = lane % 8u;
    let nx = wx + i32(token % 8u); let ny = wy + i32(token / 8u);
    var q0 = 0.0h; var q8 = 0.0h; var q16 = 0.0h; var q24 = 0.0h;
    var k0 = 0.0h; var k8 = 0.0h; var k16 = 0.0h; var k24 = 0.0h;
    if (nx >= 0 && ny >= 0 && nx < i32(attention_params.width) && ny < i32(attention_params.height)) {
      let base = (u32(ny) * attention_params.width + u32(nx)) * attention_params.channels * 3u
        + head * 96u + component;
${loads}
    }
    let q_low = nr_norm_fma(q0, q0, q16 * q16);
    let q_high = nr_norm_fma(q8, q8, q24 * q24);
    let k_low = nr_norm_fma(k0, k0, k16 * k16);
    let k_high = nr_norm_fma(k8, k8, k24 * k24);
    vector_k[lane] = vec4<f16>(q_low + q_high, k_low + k_high, 0.0h, 0.0h);
    workgroupBarrier();
    for (var stride = 4u; stride > 0u; stride >>= 1u) {
      if (component < stride) { vector_k[lane] += vector_k[lane + stride]; }
      workgroupBarrier();
    }
    if (component == 0u) {
      let squares = vector_k[lane];
      // 1/sqrt rather than inverseSqrt: WGSL gives the latter an accuracy allowance, and while the half
      // rounding would absorb it almost everywhere, "almost" is not what this port is checked against.
      window_norms[token] = vec2<f16>(f16(1.0 / sqrt(f32(squares.x))), f16(1.0 / sqrt(f32(squares.y))));
    }
    workgroupBarrier();
  }
  let scale = attention_scales[head];
`);
  for (const part of "xyzw") {
    code = code.replace(
      new RegExp(`k\\.${part} = f16\\((attention_qkv\\[base \\+ \\d+u\\])\\);`),
      `k.${part} = f16(publish_fp8(f32(f16($1) * window_norms[key].y)));`
    );
    code = code.replace(
      new RegExp(`q\\.${part} = f16\\((attention_qkv\\[base \\+ \\d+u\\])\\);`),
      `q.${part} = f16(publish_fp8(f32(f16(f16($1) * window_norms[query].x) * f16(scale))));`
    );
    code = code.replace(
      new RegExp(`v\\.${part} = f16\\((attention_qkv\\[[\\s\\S]*?\\])\\);`),
      `v.${part} = f16(publish_fp8(f32($1)));`
    );
  }
  return code;
}
var init_normalize_fused = __esm({
  "../src/window/normalize-fused.js"() {
  }
});

// ../src/window/packed-output.js
function packedOutputWindowCode(code, queries, threads) {
  const header = `  for (var linear = lane; linear < ${queries * 32}u; linear += ${threads}u) {`;
  const begin = code.lastIndexOf(header);
  const end = code.lastIndexOf("\n  }");
  if (begin < 0 || end < begin) throw new Error("Missing the window value publication");
  return code.slice(0, begin) + `  for (var linear = lane; linear < ${queries * 8}u; linear += ${threads}u) {
    let query = linear / 8u;
    let first = (linear % 8u) * 4u;
    let qx = wx + i32((query_origin + query) % 8u);
    let qy = wy + i32((query_origin + query) / 8u);
    if (qx >= 0 && qx < i32(attention_params.width) && qy >= 0 && qy < i32(attention_params.height)) {
      var word = 0u;
      for (var i = 0u; i < 4u; i++) {
        let component = first + i;
        var value = 0.0;
        for (var group = 0u; group < 4u; group++) {
          value = tiled_value(query, component, group * 16u, value);
        }
        word |= publish_e4_code(value) << (i * 8u);
      }
      let index = (u32(qy) * attention_params.width + u32(qx)) * attention_params.channels
        + head * 32u + first;
      attention_output[index / 4u] = word;
    }
  }` + code.slice(end + "\n  }".length);
}
var init_packed_output = __esm({
  "../src/window/packed-output.js"() {
  }
});

// ../src/window/layout.js
function layoutWindowCode(code) {
  let declarations = "";
  for (const field of WINDOW_LAYOUT_FIELDS) {
    const constant = `WINDOW_${field.toUpperCase()}`;
    declarations += `override ${constant}:u32=0u;
`;
    code = code.replaceAll(`attention_params.${field}`, constant);
  }
  return code.replace("struct WindowParams", declarations + "struct WindowParams");
}
var WINDOW_LAYOUT_FIELDS;
var init_layout = __esm({
  "../src/window/layout.js"() {
    WINDOW_LAYOUT_FIELDS = [
      "width",
      "height",
      "channels",
      "shift_x",
      "shift_y",
      "use_relative_bias",
      "value_group_order"
    ];
  }
});

// ../src/window/variants.js
function windowAttentionCode() {
  if (cached) return cached;
  const queries = WINDOW_QUERIES;
  const threads = WINDOW_THREADS;
  let code = compactScoreWindowCode(
    vectorWindowCode(multirowWindowCode(packedWindowCode(TILED_WINDOW_WGSL), queries), queries),
    queries,
    threads
  );
  code = rotateExponentWindowCode(unrolledWindowCode(halfValueWindowCode(floatSumWindowCode(code))));
  code = packedOutputWindowCode(fusedNormalizeWindowCode(code, threads), queries, threads);
  cached = layoutWindowCode(windowBaseCode() + code);
  return cached;
}
var WINDOW_QUERIES, WINDOW_THREADS, cached;
var init_variants = __esm({
  "../src/window/variants.js"() {
    init_base();
    init_tiled();
    init_packed();
    init_multirow();
    init_vector_loads();
    init_compact_scores();
    init_float_sum();
    init_half_value();
    init_unrolled();
    init_rotate_exponent();
    init_normalize_fused();
    init_packed_output();
    init_layout();
    WINDOW_QUERIES = 32;
    WINDOW_THREADS = 512;
    cached = null;
  }
});

// ../src/window/index.js
function requireWorkgroupStorage(device) {
  const offered = device.limits.maxComputeWorkgroupStorageSize;
  if (offered >= WINDOW_WORKGROUP_STORAGE) return;
  throw new Error(`the window attention needs ${WINDOW_WORKGROUP_STORAGE / 1024} KB of workgroup storage; this adapter offers ${offered}`);
}
var WINDOW_WORKGROUP_STORAGE, WindowAttention;
var init_window = __esm({
  "../src/window/index.js"() {
    init_pipeline_compiler();
    init_variants();
    WINDOW_WORKGROUP_STORAGE = 32768;
    WindowAttention = class _WindowAttention {
      static create(device, numerics) {
        const attention = new _WindowAttention();
        attention.device = device;
        attention.module = device.createShaderModule({
          label: "window attention",
          code: ["enable f16;", numerics, windowAttentionCode()].join("\n")
        });
        return attention;
      }
      pipeline(layout, { width, height, channels, shiftX, shiftY, relativeBias }) {
        return compileComputePipeline(this.device, {
          label: `window attend ${width}x${height} +${shiftX},${shiftY}`,
          layout,
          compute: {
            module: this.module,
            entryPoint: "attend_window_tiled",
            constants: {
              WINDOW_WIDTH: width,
              WINDOW_HEIGHT: height,
              WINDOW_CHANNELS: channels,
              WINDOW_SHIFT_X: shiftX,
              WINDOW_SHIFT_Y: shiftY,
              WINDOW_USE_RELATIVE_BIAS: relativeBias
            }
          }
        });
      }
    };
  }
});

// src/backend/model-loader.js
var BYTES_PER_ROW, DlssNrWebGpuModel;
var init_model_loader = __esm({
  "src/backend/model-loader.js"() {
    init_gpu();
    init_model();
    init_geometry();
    init_window();
    BYTES_PER_ROW = 625 * 1048576 / 294912;
    DlssNrWebGpuModel = class _DlssNrWebGpuModel {
      static async create({
        activationWidth,
        activationHeight,
        activationCapacityScale = 1,
        onProgress,
        weights = "/weights"
      } = {}) {
        const model = new _DlssNrWebGpuModel();
        onProgress?.("requesting a device");
        const { device, adapter, info: info2 } = await requestDevice();
        model.device = device;
        model.adapter = adapter;
        model.adapterInfo = info2;
        requireWorkgroupStorage(device);
        model.weightsUrl = weights;
        model.weights = await new Model(device).load(weights, (loaded, total) => {
          onProgress?.(
            `Downloading the model ${(loaded / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MiB`,
            false,
            { loaded, total, label: "DLSS model" }
          );
        });
        model.activationCapacity = Math.round(
          activationWidth * activationHeight * BYTES_PER_ROW * activationCapacityScale
        );
        return model;
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
    };
  }
});

// src/backend/inference.js
function createRuntimeProfile(validWidth, validHeight) {
  if (!Number.isInteger(validWidth) || !Number.isInteger(validHeight) || validWidth < 1 || validHeight < 1) {
    throw new Error("Runtime profile dimensions must be positive integers");
  }
  const geometry = geometryFromValid(validWidth, validHeight);
  return {
    label: `Network geometry ${validWidth}x${validHeight}`,
    sourceDimensions: [validWidth, validHeight],
    fullDimensions: [geometry.fullWidth, geometry.fullHeight],
    dimensions: geometry.levels.map((level) => [level.width, level.height]),
    geometry
  };
}
var roundNativeF16, DlssNrBrowserInference;
var init_inference = __esm({
  "src/backend/inference.js"() {
    init_geometry();
    init_numerics();
    roundNativeF16 = roundF16;
    DlssNrBrowserInference = class _DlssNrBrowserInference {
      static async create(model, onProgress, { maxVitTokens = 0 } = {}) {
        const inference = new _DlssNrBrowserInference();
        inference.model = model;
        inference.device = model.device;
        inference.maxVitTokens = maxVitTokens;
        inference.hierarchy = { storageBindingLimit: 0 };
        inference.onProgress = onProgress ?? null;
        return inference;
      }
      async ensureProductionTokens(tokens) {
        this.maxVitTokens = Math.max(this.maxVitTokens, tokens);
      }
      /**
       * Discard the recorded graph. The runtime does this once at startup: the first graph is recorded while the
       * browser is still compiling the cold shader set, and it throws that one away rather than present it. Here
       * the graph belongs to the pipeline, which the runtime destroys alongside this call, so there is nothing
       * left to drop - the device, the weights and the compiled kernels are all retained, which is the point.
       */
      resetProductionGraph() {
      }
      /** The diagnostic path, which this port does not carry. */
      async run() {
        throw new Error("the diagnostic inference path is not part of this port");
      }
    };
  }
});

// src/backend/sr-model.js
var DlssSrWebGpuModel;
var init_sr_model = __esm({
  "src/backend/sr-model.js"() {
    DlssSrWebGpuModel = class {
      static async create() {
        throw new Error("super resolution is not part of this port");
      }
    };
  }
});

// src/backend/sr-inference.js
var DlssSrBrowserInference;
var init_sr_inference = __esm({
  "src/backend/sr-inference.js"() {
    DlssSrBrowserInference = class {
      static async create() {
        throw new Error("super resolution is not part of this port");
      }
    };
  }
});

// ../src/passes.js
var BINDING_COUNT, KINDS, PARAMS_STRIDE, GEMM_BINDING_COUNT, GEMM_KINDS, Tensors, Kernels, Recorder;
var init_passes = __esm({
  "../src/passes.js"() {
    init_gpu();
    BINDING_COUNT = 9;
    KINDS = [
      "uniform",
      "read-only-storage",
      "read-only-storage",
      "read-only-storage",
      "read-only-storage",
      "storage",
      "storage",
      "storage",
      "read-only-storage"
    ];
    PARAMS_STRIDE = 256;
    GEMM_BINDING_COUNT = 8;
    GEMM_KINDS = [
      "read-only-storage",
      "read-only-storage",
      "storage",
      "read-only-storage",
      "uniform",
      "read-only-storage",
      "read-only-storage",
      "storage"
    ];
    Tensors = class {
      constructor(device) {
        this.device = device;
        this.byKey = /* @__PURE__ */ new Map();
        this.total = 0;
        this.dummy = device.createBuffer({ label: "unused", size: 4, usage: GPUBufferUsage.STORAGE });
        this.dummyWritable = [5, 6, 7].map((binding) => device.createBuffer({
          label: `unused ${binding}`,
          size: 4,
          usage: GPUBufferUsage.STORAGE
        }));
        this.dummyGemmWritable = [2, 7].map((binding) => device.createBuffer({
          label: `unused gemm ${binding}`,
          size: 4,
          usage: GPUBufferUsage.STORAGE
        }));
      }
      /**
       * An activation tensor. Rows are padded to a multiple of 64 and the whole allocation is zeroed, because a
       * kernel reading a window or a key block at the end of a tensor reads past the last valid row - and what it
       * reads there has to be zero, not whatever was left behind.
       */
      allocate(label, rows, channels, format) {
        const bytesPerValue = format === "f32" ? 4 : format === "f16" ? 2 : 1;
        const allocRows = align(rows, 64);
        const key2 = `${label}/${rows}x${channels}/${format}`;
        const existing = this.byKey.get(key2);
        if (existing) return existing;
        const size = align(allocRows * channels * bytesPerValue, 4);
        const buffer = this.device.createBuffer({
          label: key2,
          size,
          usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
        });
        const tensor = {
          label,
          rows,
          channels,
          format,
          allocRows,
          buffer,
          byteLength: size,
          validBytes: rows * channels * bytesPerValue
        };
        this.total += size;
        this.byKey.set(key2, tensor);
        return tensor;
      }
      destroy() {
        for (const tensor of this.byKey.values()) tensor.buffer.destroy();
        this.byKey.clear();
        this.dummy.destroy();
        for (const buffer of this.dummyWritable) buffer.destroy();
        for (const buffer of this.dummyGemmWritable) buffer.destroy();
      }
    };
    Kernels = class _Kernels {
      static async create(device) {
        const kernels = new _Kernels();
        kernels.device = device;
        kernels.layout = device.createBindGroupLayout({
          label: "nr",
          entries: KINDS.map((type, binding) => ({
            binding,
            visibility: GPUShaderStage.COMPUTE,
            buffer: binding === 0 ? { type, hasDynamicOffset: true, minBindingSize: PARAMS_STRIDE } : { type }
          }))
        });
        kernels.pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [kernels.layout] });
        kernels.gemmLayout = device.createBindGroupLayout({
          label: "gemm",
          entries: GEMM_KINDS.map((type, binding) => ({
            binding,
            visibility: GPUShaderStage.COMPUTE,
            buffer: binding === 4 ? { type, hasDynamicOffset: true, minBindingSize: PARAMS_STRIDE } : { type }
          }))
        });
        kernels.gemmPipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [kernels.gemmLayout] });
        return kernels;
      }
      /** Compile one WGSL file with numerics.wgsl in front of it and make a pipeline per entry point. */
      async add(numerics, source, name, entryPoints, constants) {
        const module = await compile(this.device, `${numerics}
${source}`, name);
        this.pipelines = this.pipelines ?? /* @__PURE__ */ new Map();
        for (const entryPoint of entryPoints) {
          this.pipelines.set(entryPoint, await this.device.createComputePipelineAsync({
            label: entryPoint,
            layout: this.pipelineLayout,
            compute: { module, entryPoint, constants }
          }));
        }
      }
      pipeline(name) {
        const found = this.pipelines?.get(name);
        if (!found) throw new Error(`no pipeline ${name}`);
        return found;
      }
    };
    Recorder = class {
      constructor(device, kernels, tensors) {
        this.device = device;
        this.kernels = kernels;
        this.tensors = tensors;
        this.passes = [];
        this.params = [];
        this.finished = false;
      }
      /**
       * Record one dispatch. `buffers` is sparse - an object keyed by binding index - because no kernel uses all
       * nine, and naming the ones it does use reads better than a list of nulls.
       */
      pass(entryPoint, buffers, params, workgroups, label) {
        if (this.finished) throw new Error("the graph is already recorded");
        const [x, y = 1, z = 1] = Array.isArray(workgroups) ? workgroups : [workgroups];
        if (x > 65535 || y > 65535 || z > 65535) throw new Error(`dispatch ${label} exceeds 65535 groups`);
        if (params.length * 4 > PARAMS_STRIDE) throw new Error(`parameter block of ${label} is too large`);
        this.passes.push({ kind: "dispatch", entryPoint, buffers, index: this.params.length, x, y, z, label });
        this.params.push(params);
        return this;
      }
      /**
       * Record a dispatch of a specialized kernel - one whose shape is a pipeline override rather than a uniform,
       * so there is no shared pipeline to look up. `pipeline` is a promise, which `finish` waits on. `kernel`
       * names which kernel it is, for the profile; `gemm` says which of the two binding interfaces it uses.
       */
      specialized(pipeline, { kernel, gemm = false }, buffers, params, workgroups, label) {
        if (this.finished) throw new Error("the graph is already recorded");
        const [x, y = 1, z = 1] = workgroups;
        if (x > 65535 || y > 65535 || z > 65535) throw new Error(`dispatch ${label} exceeds 65535 groups`);
        if (params.length * 4 > PARAMS_STRIDE) throw new Error(`parameter block of ${label} is too large`);
        this.passes.push({
          kind: "dispatch",
          specialized: true,
          gemm,
          entryPoint: kernel,
          pipeline,
          buffers,
          index: this.params.length,
          x,
          y,
          z,
          label
        });
        this.params.push(params);
        return this;
      }
      /**
       * Copy a tensor as it stands at this point in the graph. A copy cannot happen inside a compute pass, so
       * recording one splits the pass - which is the point: the graph reuses two buffers per stage, so a copy
       * taken at the end would show whichever block wrote last, not the one being captured.
       */
      copy(from, to, byteLength, label) {
        if (this.finished) throw new Error("the graph is already recorded");
        this.passes.push({ kind: "copy", from, to, byteLength, label });
        return this;
      }
      /**
       * `onProgress` is called while the specialized pipelines compile. That is the long wait at startup - a few
       * hundred of them - and the only part of bringing the graph up that is worth a progress count.
       */
      async finish(onProgress = null) {
        const stride = PARAMS_STRIDE / 4;
        const words = new Uint32Array(Math.max(1, this.params.length) * stride);
        this.params.forEach((block, i) => words.set(block, i * stride));
        this.paramsBuffer = this.device.createBuffer({
          label: "graph parameters",
          size: Math.max(PARAMS_STRIDE, words.byteLength),
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.device.queue.writeBuffer(this.paramsBuffer, 0, words);
        const specialized = this.passes.filter((item) => item.specialized).length;
        let compiled = 0;
        for (const pass of this.passes) {
          if (pass.kind !== "dispatch") continue;
          if (pass.specialized) {
            pass.pipeline = await pass.pipeline;
            compiled += 1;
            if (onProgress && (compiled === 1 || compiled % 16 === 0)) onProgress(compiled, specialized);
            const uniform = pass.gemm ? 4 : 0;
            pass.bindGroup = this.device.createBindGroup({
              layout: pass.gemm ? this.kernels.gemmLayout : this.kernels.layout,
              entries: Array.from(
                { length: pass.gemm ? GEMM_BINDING_COUNT : BINDING_COUNT },
                (unused, binding) => ({
                  binding,
                  resource: binding === uniform ? { buffer: this.paramsBuffer, offset: 0, size: PARAMS_STRIDE } : { buffer: pass.buffers[binding] ?? (pass.gemm ? this.unusedGemm(binding) : this.unused(binding)) }
                })
              )
            });
            continue;
          }
          pass.pipeline = this.kernels.pipeline(pass.entryPoint);
          pass.bindGroup = this.device.createBindGroup({
            layout: this.kernels.layout,
            entries: Array.from({ length: BINDING_COUNT }, (unused, binding) => ({
              binding,
              resource: binding === 0 ? { buffer: this.paramsBuffer, offset: 0, size: PARAMS_STRIDE } : { buffer: pass.buffers[binding] ?? this.unused(binding) }
            }))
          });
        }
        this.finished = true;
        return this;
      }
      unused(binding) {
        return binding >= 5 && binding <= 7 ? this.tensors.dummyWritable[binding - 5] : this.tensors.dummy;
      }
      unusedGemm(binding) {
        if (binding === 2) return this.tensors.dummyGemmWritable[0];
        if (binding === 7) return this.tensors.dummyGemmWritable[1];
        return this.tensors.dummy;
      }
      /**
       * Time every dispatch, grouped by kernel. Each pass gets its own compute pass so the timestamps bracket one
       * dispatch, which costs a little in pass overhead and tells you where the frame actually goes.
       */
      enableProfiling() {
        if (!this.device.features.has("timestamp-query")) return false;
        const count = this.passes.filter((item) => item.kind === "dispatch").length * 2;
        this.querySet = this.device.createQuerySet({ type: "timestamp", count });
        this.queryResolve = this.device.createBuffer({
          size: count * 8,
          usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.COPY_SRC
        });
        this.queryRead = this.device.createBuffer({
          size: count * 8,
          usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
        });
        this.profiling = true;
        return true;
      }
      /** Nanoseconds per kernel, summed over the frame. */
      async readProfile() {
        if (!this.profiling) return null;
        await this.queryRead.mapAsync(GPUMapMode.READ);
        const stamps = new BigUint64Array(this.queryRead.getMappedRange().slice(0));
        this.queryRead.unmap();
        const totals = /* @__PURE__ */ new Map();
        let index = 0;
        for (const item of this.passes) {
          if (item.kind !== "dispatch") continue;
          const nanoseconds = Number(stamps[index * 2 + 1] - stamps[index * 2]);
          totals.set(item.entryPoint, (totals.get(item.entryPoint) ?? 0) + nanoseconds);
          index += 1;
        }
        return [...totals.entries()].map(([name, ns]) => ({ name, milliseconds: ns / 1e6 })).sort((a, b) => b.milliseconds - a.milliseconds);
      }
      encode(encoder) {
        if (this.profiling) return this.encodeProfiled(encoder);
        let pass = null;
        for (const item of this.passes) {
          if (item.kind === "copy") {
            if (pass) {
              pass.end();
              pass = null;
            }
            encoder.copyBufferToBuffer(item.from, 0, item.to, 0, item.byteLength);
            continue;
          }
          if (!pass) pass = encoder.beginComputePass({ label: "nr" });
          pass.setPipeline(item.pipeline);
          pass.setBindGroup(0, item.bindGroup, [item.index * PARAMS_STRIDE]);
          pass.dispatchWorkgroups(item.x, item.y, item.z);
        }
        if (pass) pass.end();
      }
      encodeProfiled(encoder) {
        let index = 0;
        for (const item of this.passes) {
          if (item.kind === "copy") {
            encoder.copyBufferToBuffer(item.from, 0, item.to, 0, item.byteLength);
            continue;
          }
          const pass = encoder.beginComputePass({
            label: item.label,
            timestampWrites: {
              querySet: this.querySet,
              beginningOfPassWriteIndex: index * 2,
              endOfPassWriteIndex: index * 2 + 1
            }
          });
          pass.setPipeline(item.pipeline);
          pass.setBindGroup(0, item.bindGroup, [item.index * PARAMS_STRIDE]);
          pass.dispatchWorkgroups(item.x, item.y, item.z);
          pass.end();
          index += 1;
        }
        encoder.resolveQuerySet(this.querySet, 0, index * 2, this.queryResolve, 0);
        encoder.copyBufferToBuffer(this.queryResolve, 0, this.queryRead, 0, index * 8 * 2);
      }
      get dispatchCount() {
        return this.passes.filter((item) => item.kind === "dispatch").length;
      }
      /** The parameter block and the profiling queries; the tensors and pipelines belong to others. */
      destroy() {
        this.paramsBuffer?.destroy();
        this.querySet?.destroy();
        this.queryResolve?.destroy();
        this.queryRead?.destroy();
      }
    };
  }
});

// ../src/matmul/silu-table.js
async function createSiluTable(device, code) {
  if (tables.has(device)) return tables.get(device);
  const build = (async () => {
    const fn = (name) => {
      const begin = code.indexOf(`fn ${name}(`), end = code.indexOf("\n}", begin) + 2;
      if (begin < 0 || end < 2) throw new Error(`Missing ${name}`);
      return code.slice(begin, end);
    };
    const shader = `enable f16;
fn round_accumulator(value: f32) -> f32 { return f32(f16(value)); }
${fn("mp_cubic_silu")}
${fn("fp8_domain")}
@group(0) @binding(0) var<storage, read_write> values: array<vec2<f16>>;
@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
  let value = f32(bitcast<vec2<f16>>(id.x).x);
  let activated = mp_cubic_silu(value);
  values[id.x] = vec2<f16>(f16(activated), f16(fp8_domain(activated)));
}`;
    const module = device.createShaderModule({ label: "NR native SiLU table builder", code: shader });
    const errors = (await module.getCompilationInfo()).messages.filter((m) => m.type === "error");
    if (errors.length) throw new Error(errors.map((m) => m.message).join("\n"));
    const pipeline = await compileComputePipeline(device, { layout: "auto", compute: { module, entryPoint: "main" } });
    const buffer = device.createBuffer({
      label: "NR complete half SiLU and E4 table",
      size: 65536 * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
    });
    const group = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer } }]
    });
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, group);
    pass.dispatchWorkgroups(256);
    pass.end();
    device.queue.submit([encoder.finish()]);
    return buffer;
  })();
  tables.set(device, build);
  return build;
}
function siluTableMatmulCode(code) {
  code = code.replace(
    "struct MatmulParams",
    "@group(0) @binding(5) var<storage, read> native_silu_table: array<vec2<f16>>;\nstruct MatmulParams"
  );
  const original = `        if ((MATMUL_FLAGS & 4u) != 0u) { value = mp_cubic_silu(value); }
        output_values[output_index] = select(value, fp8_domain(value), (MATMUL_FLAGS & 32u) != 0u);`;
  if (!code.includes(original)) throw new Error("Missing native SiLU publication");
  return code.replace(original, `        if ((MATMUL_FLAGS & 4u) != 0u) {
          let index = bitcast<u32>(vec2<f16>(f16(value), 0.0h)) & 65535u;
          output_values[output_index] = f32(native_silu_table[index][select(0u, 1u, (MATMUL_FLAGS & 32u) != 0u)]);
        } else {
          output_values[output_index] = select(value, fp8_domain(value), (MATMUL_FLAGS & 32u) != 0u);
        }`);
}
var tables;
var init_silu_table = __esm({
  "../src/matmul/silu-table.js"() {
    init_pipeline_compiler();
    tables = /* @__PURE__ */ new WeakMap();
  }
});

// ../src/matmul/weight-table.js
function weightMetadataWords() {
  const words = new Uint32Array(256);
  const halfInteger = (value) => {
    if (value === 0) return 0;
    const magnitude = Math.abs(value), exponent = Math.floor(Math.log2(magnitude));
    return (value < 0 ? 32768 : 0) | exponent + 15 << 10 | (magnitude / 2 ** exponent - 1) * 1024;
  };
  for (let byte = 0; byte < 256; byte++) {
    const magnitude = byte & 127, zero = magnitude === 0 || magnitude === 127;
    const scaled = zero ? (byte & 128) << 8 : e4m3ToFloat16Bits(byte) + 2048;
    const exponent = zero ? -100 : Math.max((magnitude >> 3) - 7, -6);
    words[byte] = scaled | halfInteger(exponent) << 16;
  }
  return words;
}
function createWeightMetadataTable(device) {
  if (tables2.has(device)) return tables2.get(device);
  const data = weightMetadataWords();
  const buffer = device.createBuffer({
    label: "NR all E4 weight metadata",
    size: data.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(buffer, 0, data);
  tables2.set(device, buffer);
  return buffer;
}
function weightTableMatmulCode(code) {
  code = code.replace(
    "struct MatmulParams",
    "@group(0) @binding(6) var<storage, read> weight_metadata: array<vec2<f16>>;\nstruct MatmulParams"
  );
  const load = "      var b = 0.0;";
  if (!code.includes(load)) throw new Error("Missing weight metadata loader");
  return code.replace(load, load + "\n      let metadata = weight_metadata[(weight_word >> (part * 8u)) & 255u];").replace("loaded_b[part] = f16(b * 4.0);", "loaded_b[part] = metadata.x;").replace("eb[part] = f16(select(-100, e4m3_exponent(b), b != 0.0));", "eb[part] = metadata.y;");
}
var e4m3ToFloat16Bits, tables2;
var init_weight_table = __esm({
  "../src/matmul/weight-table.js"() {
    init_numerics();
    e4m3ToFloat16Bits = (byte) => f16Bits(e4m3ToNumber(byte));
    tables2 = /* @__PURE__ */ new WeakMap();
  }
});

// ../src/matmul/packed-activation.js
async function createPackedSiluTable(device, source) {
  if (tables3.has(device)) return tables3.get(device);
  const build = (async () => {
    const module = device.createShaderModule({ label: "NR packed E4 SiLU table builder", code: `enable f16;
${exactCode}
@group(0) @binding(0) var<storage, read> source: array<vec2<f16>>;
@group(0) @binding(1) var<storage, read_write> result: array<u32>;
@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
  var word = 0u;
  for (var part = 0u; part < 4u; part++) {
    word |= exact_e4_output_code(f32(source[id.x * 4u + part].y)) << (part * 8u);
  }
  result[id.x] = word;
}` });
    const errors = (await module.getCompilationInfo()).messages.filter((m) => m.type === "error");
    if (errors.length) throw new Error(errors.map((m) => m.message).join("\n"));
    const pipeline = await compileComputePipeline(device, { layout: "auto", compute: { module, entryPoint: "main" } });
    const buffer = device.createBuffer({
      label: "NR all half-input SiLU E4 bytes",
      size: 65536,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
    });
    const group = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [
      { binding: 0, resource: { buffer: source } },
      { binding: 1, resource: { buffer } }
    ] });
    const encoder = device.createCommandEncoder(), pass = encoder.beginComputePass();
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, group);
    pass.dispatchWorkgroups(64);
    pass.end();
    device.queue.submit([encoder.finish()]);
    return buffer;
  })();
  tables3.set(device, build);
  return build;
}
function packedActivationMatmulCode(code, { input = false, output: output2 = false, prefetch = false, rowOutput = false } = {}) {
  if (!input && !output2) throw new Error("Packed activation mode is empty");
  if (input) {
    if (prefetch) {
      const index = code.match(/        a = input_values\[([^\n]+)\];/)?.[1];
      if (!index) throw new Error("Missing packed input index for prefetch");
      const loop = "    for (var part = 0u; part < 4u; part++) {";
      if (!code.includes(loop)) throw new Error("Missing packed input fragment loop");
      const loads = [0, 2].map((part) => `    let packed_k${part} = k_base + tile_k + ${part}u;
    var packed_input_k${part} = select(packed_k${part}, native_chained_input_index(packed_k${part}), (MATMUL_FLAGS & 16u) != 0u);
    if ((MATMUL_FLAGS & 128u) != 0u) { packed_input_k${part} = native_inverse_chained_input_index(packed_k${part}); }
    let packed_index${part} = ${index.replace(/\binput_k\b/g, `packed_input_k${part}`)};
    var packed_word${part} = 0u;
    if (input_row < MATMUL_ROWS && packed_k${part} < MATMUL_K) {
      packed_word${part} = input_values[packed_index${part} / 4u];
    }`).join("\n");
      code = code.replace(loop, loads + "\n" + loop).replace(/      var input_k = [^\n]+;\n      if \(\(MATMUL_FLAGS & 128u\)[^\n]+\n/, "").replace(/      if \([^\n]+input_row[^\n]+\) \{\n        a = input_values\[[^\n]+\];\n      }/, `      let word = select(packed_word0, packed_word2, part >= 2u);
      let shift = (select(packed_index0, packed_index2, part >= 2u) % 4u + part % 2u) * 8u;
      let a_metadata = weight_metadata[(word >> shift) & 255u];`).replace("input_values: array<f32>", "input_values: array<u32>").replace("loaded_a[part] = f16(a * 4.0);", "loaded_a[part] = a_metadata.x;").replace("ea[part] = f16(select(-100, e4m3_exponent(a), a != 0.0));", "ea[part] = a_metadata.y;");
      if (!code.includes("let a_metadata = weight_metadata[(word >> shift)")) throw new Error("Missing packed prefetch consumer");
    } else {
      code = code.replace("input_values: array<f32>", "input_values: array<u32>").replace("      var a = 0.0;", "      var a_metadata = vec2<f16>(0.0h, -100.0h);\n      var a = 0.0;").replace(/        a = input_values\[([^\n]+)\];/, (_, index) => `        let packed_index = ${index};
          let packed_a = input_values[packed_index / 4u];
          a_metadata = weight_metadata[(packed_a >> ((packed_index % 4u) * 8u)) & 255u];`).replace("loaded_a[part] = f16(a * 4.0);", "loaded_a[part] = a_metadata.x;").replace("ea[part] = f16(select(-100, e4m3_exponent(a), a != 0.0));", "ea[part] = a_metadata.y;");
      if (!code.includes("let packed_index =")) throw new Error("Missing packed input load");
    }
  }
  if (!output2) return code;
  code = code.replace("output_values: array<f32>", "output_values: array<u32>").replace("native_silu_table: array<vec2<f16>>", "native_silu_table: array<u32>");
  if (rowOutput) {
    code = code.replace("@workgroup_size(16, 16, 1)", "@workgroup_size(8, 32, 1)").replaceAll("local_id.y * 2u", "local_id.y").replaceAll("local_id.x * 2u", "local_id.x * 4u").replaceAll("local_row < 2u", "local_row < 1u").replaceAll("local_column < 2u", "local_column < 4u").replaceAll("local_row * 2u + local_column", "local_row * 4u + local_column").replace(/    let a1 = tile_(?:ea|a)\[[^\n]+\];\n/g, "").replace(/    let b1 = (tile_eb|tile_b)\[\(column \+ 1u\) \* 9u \+ k\];/g, (line, table) => `${line}
    let b2 = ${table}[(column + 2u) * 9u + k];
    let b3 = ${table}[(column + 3u) * 9u + k];`).replaceAll("a1 + b0", "a0 + b2").replaceAll("a1 + b1", "a0 + b3");
    for (const part of "xyzw") code = code.replaceAll(`vec4<f16>(a0.${part}, a0.${part}, a1.${part}, a1.${part})`, `vec4<f16>(a0.${part})`).replaceAll(
      `vec4<f16>(b0.${part}, b1.${part}, b0.${part}, b1.${part})`,
      `vec4<f16>(b0.${part}, b1.${part}, b2.${part}, b3.${part})`
    );
    if (/\ba1\b/.test(code)) throw new Error("Unconverted two-row packed producer");
  } else code = code.replace("tile_ea: array<vec4<f16>, 256>", "tile_ea: array<vec2<u32>, 256>").replace("tile_ea[local_index] = ea;", "tile_ea[local_index] = bitcast<vec2<u32>>(ea);").replace(/(let a[01] = )(tile_ea\[[^\n]+?\]);/g, "$1bitcast<vec4<f16>>($2);");
  code = code.replace("struct MatmulParams", `
${PACKED_E4_PUBLICATION_WGSL}
struct MatmulParams`);
  const begin = code.lastIndexOf(`  for (var local_row = 0u; local_row < ${rowOutput ? 1 : 2}u; local_row += 1u) {`);
  const end = code.lastIndexOf("\n}");
  if (begin < 0 || end < begin) throw new Error("Missing packed output publication");
  let tail = code.slice(begin, end);
  const outputIndex = tail.match(/let output_index = ([\s\S]*?);/)?.[1];
  if (!outputIndex) throw new Error("Missing packed output index");
  tail = tail.replace(
    "    let row = row_base + local_row;",
    "    let row = row_base + local_row;\n    var published_pair = 0u;"
  );
  let writes = 0;
  tail = tail.replace(/output_values\[output_index\] = ([^;]+);/g, (_, value) => {
    writes++;
    if (value.includes("native_silu_table")) {
      return `let code = (native_silu_table[index / 4u] >> ((index % 4u) * 8u)) & 255u;
          published_pair |= code << (local_column * 8u);`;
    }
    if (!value.includes("fp8_domain(value)")) throw new Error("Missing E4 quantization contract");
    return "published_pair |= publish_e4_code(value) << (local_column * 8u);";
  });
  if (writes !== 2) throw new Error(`Expected two E4 publications, got ${writes}`);
  const close = tail.lastIndexOf("  }");
  if (rowOutput) {
    tail = tail.slice(0, close) + `    if (row < MATMUL_ROWS && column_base < MATMUL_N) {
      let column = column_base;
      let output_index = ${outputIndex};
      output_values[output_index / 4u] = published_pair;
    }
` + tail.slice(close);
    return code.slice(0, begin) + tail + code.slice(end);
  }
  tail = tail.slice(0, close) + "    tile_ea[local_id.y * 16u + local_id.x][local_row] = published_pair;\n" + tail.slice(close);
  tail += `
  workgroupBarrier();
  let row = row_group * 32u + local_index / 8u;
  let column = column_base - local_id.x * 2u + (local_index % 8u) * 4u;
  if (row < MATMUL_ROWS && column < MATMUL_N) {
    let owner = (local_index / 16u) * 16u + (local_index % 8u) * 2u;
    let part = (local_index / 8u) % 2u;
    let packed = tile_ea[owner][part] | (tile_ea[owner + 1u][part] << 16u);
    let output_index = ${outputIndex};
    output_values[output_index / 4u] = packed;
  }
`;
  return code.slice(0, begin) + tail + code.slice(end);
}
var tables3, PACKED_E4_PUBLICATION_WGSL, exactCode;
var init_packed_activation = __esm({
  "../src/matmul/packed-activation.js"() {
    init_pipeline_compiler();
    tables3 = /* @__PURE__ */ new WeakMap();
    PACKED_E4_PUBLICATION_WGSL = `fn publish_e4_code(value: f32) -> u32 {
  if (value != value) { return 0u; }
  let magnitude = min(abs(value), 448.0);
  if (magnitude == 0.0) { return 0u; }
  var code: u32;
  if (magnitude < 0.015625) {
    code = u32(round(magnitude * 512.0));
  } else {
    let bits = bitcast<u32>(magnitude);
    let rounded = (bits + 0x7ffffu + ((bits >> 20u) & 1u)) & 0xfff00000u;
    code = (rounded >> 20u) - 960u;
  }
  return code | select(0u, 128u, value < 0.0);
}`;
    exactCode = `fn exact_e4_output_code(value: f32) -> u32 {
  let magnitude = abs(value);
  let bits = bitcast<u32>(magnitude);
  let code = select(u32(magnitude * 512.0), (bits >> 20u) - 960u, magnitude >= 0.015625);
  return code | ((bitcast<u32>(value) >> 24u) & 128u);
}`;
  }
});

// ../src/matmul/bit-quant.js
function bitQuantMatmulCode(code) {
  const start = code.indexOf("fn fp8_domain(");
  const end = code.indexOf("\n}", start) + 2;
  if (start < 0 || end < 2) throw new Error("Missing FP8 publication");
  return code.slice(0, start) + `fn fp8_domain(value: f32) -> f32 {
  if (value != value) { return 0.0; }
  let magnitude = min(abs(value), 448.0);
  if (magnitude == 0.0) { return 0.0; }
  var quantized: f32;
  if (magnitude < 0.015625) {
    quantized = round(magnitude * 512.0) / 512.0;
  } else {
    let bits = bitcast<u32>(magnitude);
    quantized = bitcast<f32>((bits + 0x7ffffu + ((bits >> 20u) & 1u)) & 0xfff00000u);
  }
  return select(quantized, -quantized, value < 0.0);
}` + code.slice(end);
}
var init_bit_quant = __esm({
  "../src/matmul/bit-quant.js"() {
  }
});

// ../src/matmul/base.js
function productionMatmulCode() {
  return MATMUL_WGSL.replace("/*__F16_ENABLE__*/", "enable f16;").replace(
    "/*__ROUND_F16__*/",
    "fn round_accumulator(value: f32) -> f32 { return f32(f16(value)); }"
  ).replace(/fn ada_fp8_fdpa\([\s\S]*?\n}/, PRODUCTION_FDPA).replace("exp2(f32(i32(exponent) - 7))", "bitcast<f32>((exponent + 120u) << 23u)").replace(
    "exp2(floor(log2(magnitude)) - 3.0)",
    "bitcast<f32>((((bitcast<u32>(magnitude) >> 23u) & 255u) - 3u) << 23u)"
  ).replaceAll("params.flags", "MATMUL_FLAGS").replace("struct MatmulParams", "override MATMUL_FLAGS: u32 = 0u;\nstruct MatmulParams");
}
var MATMUL_WGSL, PRODUCTION_FDPA;
var init_base2 = __esm({
  "../src/matmul/base.js"() {
    MATMUL_WGSL = String.raw`
/*__F16_ENABLE__*/
struct MatmulParams {
  rows: u32,
  input_channels: u32,
  output_channels: u32,
  weight_byte_offset: u32,
  bias_byte_offset: u32,
  flags: u32,
  weight_matrix_channels: u32,
  weight_column_offset: u32,
  output_matrix_channels: u32,
  output_column_offset: u32,
}

@group(0) @binding(0) var<storage, read> input_values: array<f32>;
@group(0) @binding(1) var<storage, read> packed_weights: array<u32>;
@group(0) @binding(2) var<storage, read_write> output_values: array<f32>;
@group(0) @binding(3) var<storage, read> residual_values: array<f32>;
@group(0) @binding(4) var<uniform> params: MatmulParams;

var<workgroup> tile_a: array<f32, 1024>;
var<workgroup> tile_b: array<f32, 1024>;

fn packed_byte(byte_offset: u32) -> u32 {
  let word = packed_weights[byte_offset >> 2u];
  return (word >> ((byte_offset & 3u) * 8u)) & 0xffu;
}

fn decode_e4m3(bits: u32) -> f32 {
  let negative = (bits & 0x80u) != 0u;
  let exponent = (bits >> 3u) & 0x0fu;
  let mantissa = bits & 0x07u;
  var value: f32;
  if (exponent == 0u) {
    value = f32(mantissa) * 0.001953125;
  } else if (exponent == 15u && mantissa == 7u) {
    value = 0.0;
  } else {
    value = (1.0 + f32(mantissa) * 0.125) * exp2(f32(i32(exponent) - 7));
  }
  return select(value, -value, negative);
}

fn packed_weight_index(k: u32, n: u32, output_channels: u32) -> u32 {
  let k_tile = k >> 5u;
  let k_in_tile = k & 31u;
  let n_tile = n >> 7u;
  let n_in_tile = n & 127u;
  let n_half = n_in_tile >> 6u;
  let n_group = (n_in_tile & 63u) >> 4u;
  let n_in_group = n_in_tile & 15u;
  let lane = ((n_in_group & 7u) << 2u) | ((k_in_tile & 15u) >> 2u);
  let byte_in_lane = ((n_in_group >> 3u) << 3u) | ((k_in_tile >> 4u) << 2u) | (k_in_tile & 3u);
  return k_tile * output_channels * 32u
    + n_tile * 4096u
    + n_half * 2048u
    + n_group * 512u
    + lane * 16u
    + byte_in_lane;
}

fn expert_interleaved_weight_index(k: u32, n: u32, experts: u32, expert: u32) -> u32 {
  let output_group = n >> 5u;
  let output_in_group = n & 31u;
  return output_group * experts * 1024u + expert * 1024u
    + packed_weight_index(k, output_in_group, 32u);
}

fn native_chained_input_index(k: u32) -> u32 {
  let base = k & ~31u;
  let within = k & 31u;
  let half = within & 16u;
  let quarter = within & 15u;
  return base + half + (quarter >> 2u) * 2u + (quarter & 1u)
    + select(0u, 8u, (quarter & 2u) != 0u);
}

fn native_inverse_chained_input_index(k: u32) -> u32 {
  let base = k & ~31u;
  let within = k & 31u;
  return base + (within & 17u) + ((within & 2u) << 1u)
    + ((within & 4u) << 1u) + ((within & 8u) >> 2u);
}

fn load_aux_half(channel: u32) -> f32 {
  let half_index = (params.bias_byte_offset >> 1u) + channel;
  let halves = unpack2x16float(packed_weights[half_index >> 1u]);
  return select(halves.x, halves.y, (half_index & 1u) != 0u);
}

/*__ROUND_F16__*/

// The network's cubic SiLU. Each step is one operation rounded once to half, and both the constants and the
// order they are applied in are part of the result rather than an implementation detail: see
// docs/numerics.md. The f32 twin in shaders/numerics.wgsl is checked against the same reference.
fn mp_cubic_silu(value: f32) -> f32 {
  let bounded = round_accumulator(clamp(value, -4.0, 4.0));
  let absolute = round_accumulator(abs(bounded));
  let inner = round_accumulator(-0.055908203125 * absolute + 0.447265625);
  let polynomial = round_accumulator(bounded * inner + 0.89453125);
  return round_accumulator(value * polynomial);
}

fn fp8_domain(value: f32) -> f32 {
  if (value != value) { return 0.0; }
  let magnitude = min(abs(value), 448.0);
  if (magnitude == 0.0) { return 0.0; }
  var quantized: f32;
  if (magnitude < 0.015625) {
    quantized = round(magnitude * 512.0) / 512.0;
  } else {
    let step = exp2(floor(log2(magnitude)) - 3.0);
    quantized = min(round(magnitude / step) * step, 448.0);
  }
  return select(quantized, -quantized, value < 0.0);
}

// Bit-accurate Ada FP8 tensor-core arithmetic recovered independently by
// Microsoft's MMA-Sim model.  Ada's m16n8k32 FP8 instruction is two fused
// 16-product reductions.  Each reduction aligns its products and incoming
// FP16 accumulator to a shared exponent, truncates every aligned significand
// to 13 fractional bits, sums those fixed-point terms exactly, then rounds the
// result to FP16.  A scalar IEEE dot product does not reproduce this behavior.
fn normal_exponent(value: f32) -> i32 {
  return i32((bitcast<u32>(abs(value)) >> 23u) & 0xffu) - 127;
}

fn e4m3_exponent(value: f32) -> i32 {
  return max(normal_exponent(value), -6);
}

fn f16_exponent(value: f32) -> i32 {
  return max(normal_exponent(value), -14);
}

fn ada_fp8_fdpa(row: u32, column: u32, k_start: u32, k_count: u32, accumulator: f32) -> f32 {
  // The hardware instruction carries an infinite accumulator through finite E4 products unchanged.
  // Normalizing it with exp2(-128) instead would flush the scale to zero and manufacture a NaN the
  // instruction never produces, so an infinite accumulator returns as it arrived.
  if ((bitcast<u32>(accumulator) & 0x7f800000u) == 0x7f800000u) { return accumulator; }
  var maximum_exponent = -21;
  if (accumulator != 0.0) { maximum_exponent = f16_exponent(accumulator); }
  for (var offset = 0u; offset < k_count; offset += 1u) {
    let a = tile_a[row * 32u + k_start + offset];
    let b = tile_b[(k_start + offset) * 32u + column];
    if (a != 0.0 && b != 0.0) {
      maximum_exponent = max(maximum_exponent, e4m3_exponent(a) + e4m3_exponent(b));
    }
  }

  var fused_significand = 0.0;
  if (accumulator != 0.0) {
    let exponent = f16_exponent(accumulator);
    let significand = accumulator * exp2(-f32(exponent));
    fused_significand += trunc(significand
      * exp2(f32(exponent - maximum_exponent + 13))) * 0.0001220703125;
  }
  for (var offset = 0u; offset < k_count; offset += 1u) {
    let a = tile_a[row * 32u + k_start + offset];
    let b = tile_b[(k_start + offset) * 32u + column];
    if (a != 0.0 && b != 0.0) {
      let exponent_a = e4m3_exponent(a);
      let exponent_b = e4m3_exponent(b);
      let significand_a = a * exp2(-f32(exponent_a));
      let significand_b = b * exp2(-f32(exponent_b));
      let exponent = exponent_a + exponent_b;
      fused_significand += trunc(significand_a * significand_b
        * exp2(f32(exponent - maximum_exponent + 13))) * 0.0001220703125;
    }
  }
  return round_accumulator(fused_significand * exp2(f32(maximum_exponent)));
}

@compute @workgroup_size(8, 8, 1)
fn main(
  @builtin(local_invocation_index) local_index: u32,
  @builtin(workgroup_id) group_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  let row_group = group_id.y + group_id.z * 65535u;
  let row_base = row_group * 32u + local_id.y * 4u;
  let column_base = group_id.x * 32u + local_id.x * 4u;
  var sums = array<f32, 16>();
  var tile_sums = array<f32, 16>();
  var partition_sums = array<f32, 16>();

  // Native mma.sync uses FP16 accumulators. Residual/bias values initialize
  // those accumulators before the first K tile; adding them after the matrix
  // product changes every subsequent FP16 rounding step.
  for (var local_row = 0u; local_row < 4u; local_row += 1u) {
    let row = row_base + local_row;
    for (var local_column = 0u; local_column < 4u; local_column += 1u) {
      let column = column_base + local_column;
      if (row < params.rows && column < params.output_channels) {
        let output_index = row * params.output_matrix_channels
          + params.output_column_offset + column;
        var initial = 0.0;
        if ((params.flags & 1u) != 0u) { initial += load_aux_half(column); }
        if ((params.flags & 2u) != 0u && (params.flags & 65536u) == 0u) {
          var residual = residual_values[output_index];
          if ((params.flags & 8u) != 0u) { residual *= load_aux_half(column); }
          initial += residual;
        }
        sums[local_row * 4u + local_column] = round_accumulator(initial);
      }
    }
  }

  for (var k_base = 0u; k_base < params.input_channels; k_base += 32u) {
    if ((params.flags & 256u) != 0u) {
      for (var accumulator = 0u; accumulator < 16u; accumulator += 1u) {
        tile_sums[accumulator] = 0.0;
      }
    }
    for (var linear = local_index; linear < 1024u; linear += 64u) {
      let tile_row = linear >> 5u;
      let tile_column = linear & 31u;
      let input_row = row_group * 32u + tile_row;
      let k = k_base + tile_column;
      var input_k = select(k, native_chained_input_index(k), (params.flags & 16u) != 0u);
      if ((params.flags & 128u) != 0u) { input_k = native_inverse_chained_input_index(k); }
      tile_a[linear] = 0.0;
      if (input_row < params.rows && k < params.input_channels) {
        tile_a[linear] = input_values[input_row * params.input_channels + input_k];
      }

      let output_column = group_id.x * 32u + tile_column;
      tile_b[linear] = 0.0;
      if (output_column < params.output_channels && k_base + tile_row < params.input_channels) {
        var weight_index: u32;
        if ((params.flags & 64u) != 0u) {
          weight_index = expert_interleaved_weight_index(
            k_base + tile_row,
            output_column,
            params.weight_matrix_channels,
            params.weight_column_offset,
          );
        } else {
          weight_index = packed_weight_index(
            k_base + tile_row,
            output_column + params.weight_column_offset,
            params.weight_matrix_channels,
          );
        }
        tile_b[linear] = decode_e4m3(packed_byte(params.weight_byte_offset + weight_index));
      }
    }
    workgroupBarrier();

    if ((params.flags & 64512u) != 0u) {
      for (var local_row = 0u; local_row < 4u; local_row += 1u) {
        for (var local_column = 0u; local_column < 4u; local_column += 1u) {
          let accumulator = local_row * 4u + local_column;
          let tile_row = local_id.y * 4u + local_row;
          let tile_column = local_id.x * 4u + local_column;
          var reduction_length = 16u;
          if ((params.flags & 2048u) != 0u) { reduction_length = 8u; }
          if ((params.flags & 4096u) != 0u) { reduction_length = 4u; }
          for (var reduction_start = 0u; reduction_start < 32u;
              reduction_start += reduction_length) {
            sums[accumulator] = ada_fp8_fdpa(tile_row, tile_column,
              reduction_start, reduction_length, sums[accumulator]);
          }
        }
      }
    } else {
     for (var k = 0u; k < 32u; k += 1u) {
      let a0 = tile_a[(local_id.y * 4u + 0u) * 32u + k];
      let a1 = tile_a[(local_id.y * 4u + 1u) * 32u + k];
      let a2 = tile_a[(local_id.y * 4u + 2u) * 32u + k];
      let a3 = tile_a[(local_id.y * 4u + 3u) * 32u + k];
      let b0 = tile_b[k * 32u + local_id.x * 4u + 0u];
      let b1 = tile_b[k * 32u + local_id.x * 4u + 1u];
      let b2 = tile_b[k * 32u + local_id.x * 4u + 2u];
      let b3 = tile_b[k * 32u + local_id.x * 4u + 3u];
      if ((params.flags & 256u) != 0u) {
        tile_sums[0] += a0 * b0; tile_sums[1] += a0 * b1; tile_sums[2] += a0 * b2; tile_sums[3] += a0 * b3;
        tile_sums[4] += a1 * b0; tile_sums[5] += a1 * b1; tile_sums[6] += a1 * b2; tile_sums[7] += a1 * b3;
        tile_sums[8] += a2 * b0; tile_sums[9] += a2 * b1; tile_sums[10] += a2 * b2; tile_sums[11] += a2 * b3;
        tile_sums[12] += a3 * b0; tile_sums[13] += a3 * b1; tile_sums[14] += a3 * b2; tile_sums[15] += a3 * b3;
      } else {
        sums[0] += a0 * b0; sums[1] += a0 * b1; sums[2] += a0 * b2; sums[3] += a0 * b3;
        sums[4] += a1 * b0; sums[5] += a1 * b1; sums[6] += a1 * b2; sums[7] += a1 * b3;
        sums[8] += a2 * b0; sums[9] += a2 * b1; sums[10] += a2 * b2; sums[11] += a2 * b3;
        sums[12] += a3 * b0; sums[13] += a3 * b1; sums[14] += a3 * b2; sums[15] += a3 * b3;
      }
     }
     for (var accumulator = 0u; accumulator < 16u; accumulator += 1u) {
      if ((params.flags & 256u) != 0u) {
        let tile_sum = select(tile_sums[accumulator], round_accumulator(tile_sums[accumulator]),
          (params.flags & 512u) != 0u);
        sums[accumulator] = round_accumulator(sums[accumulator] + tile_sum);
      } else {
        sums[accumulator] = round_accumulator(sums[accumulator]);
      }
      }
    }
    let partition_width = select(
      select(1024u, 512u, (params.flags & 16384u) != 0u),
      256u,
      (params.flags & 32768u) != 0u,
    );
    if ((params.flags & 57344u) != 0u
        && (((k_base + 32u) % partition_width) == 0u
          || (k_base + 32u) >= params.input_channels)) {
      for (var accumulator = 0u; accumulator < 16u; accumulator += 1u) {
        if (k_base < partition_width) {
          partition_sums[accumulator] = sums[accumulator];
        } else {
          partition_sums[accumulator] = round_accumulator(
            partition_sums[accumulator] + sums[accumulator]);
        }
        sums[accumulator] = 0.0;
      }
    }
    workgroupBarrier();
  }

  if ((params.flags & 57344u) != 0u) {
    for (var accumulator = 0u; accumulator < 16u; accumulator += 1u) {
      sums[accumulator] = partition_sums[accumulator];
    }
  }

  for (var local_row = 0u; local_row < 4u; local_row += 1u) {
    let row = row_base + local_row;
    for (var local_column = 0u; local_column < 4u; local_column += 1u) {
      let column = column_base + local_column;
      if (row < params.rows && column < params.output_channels) {
        let output_index = row * params.output_matrix_channels
          + params.output_column_offset + column;
        var value = sums[local_row * 4u + local_column];
        if ((params.flags & 2u) != 0u && (params.flags & 65536u) != 0u) {
          var residual = residual_values[output_index];
          if ((params.flags & 8u) != 0u) {
            value = round_accumulator(value + residual * load_aux_half(column));
          } else {
            value = round_accumulator(value + residual);
          }
        }
        if ((params.flags & 4u) != 0u) { value = mp_cubic_silu(value); }
        output_values[output_index] = select(value, fp8_domain(value), (params.flags & 32u) != 0u);
      }
    }
  }
}
`;
    PRODUCTION_FDPA = `fn ada_fp8_fdpa(row: u32, column: u32, k_start: u32, k_count: u32, accumulator: f32) -> f32 {
  var maximum_exponent = -21;
  if (accumulator != 0.0) { maximum_exponent = f16_exponent(accumulator); }
  for (var offset = 0u; offset < k_count; offset += 1u) {
    let a = tile_a[row * 32u + k_start + offset];
    let b = tile_b[(k_start + offset) * 32u + column];
    if (a != 0.0 && b != 0.0) {
      maximum_exponent = max(maximum_exponent, e4m3_exponent(a) + e4m3_exponent(b));
    }
  }
  let alignment = bitcast<f32>(u32(140 - maximum_exponent) << 23u);
  var fixed_sum = select(0.0, trunc(accumulator * alignment), accumulator != 0.0);
  for (var offset = 0u; offset < k_count; offset += 1u) {
    let a = tile_a[row * 32u + k_start + offset];
    let b = tile_b[(k_start + offset) * 32u + column];
    fixed_sum += trunc((a * b) * alignment);
  }
  return round_accumulator(fixed_sum * bitcast<f32>(u32(maximum_exponent + 114) << 23u));
}`;
  }
});

// ../src/matmul/tiled.js
function retileMatmulCode(code) {
  const legacyStart = code.indexOf("    } else {\n     for (var k = 0u;");
  const legacyEnd = code.indexOf("    let partition_width", legacyStart);
  if (legacyStart < 0 || legacyEnd < 0) throw new Error("Unrecognized matmul source layout");
  code = code.slice(0, legacyStart) + "    }\n" + code.slice(legacyEnd);
  return code.replace("@workgroup_size(8, 8, 1)", "@workgroup_size(16, 16, 1)").replaceAll("array<f32, 16>()", "array<f32, 4>()").replaceAll("local_id.y * 4u", "local_id.y * 2u").replaceAll("local_id.x * 4u", "local_id.x * 2u").replaceAll("local_row * 4u", "local_row * 2u").replaceAll("local_row < 4u", "local_row < 2u").replaceAll("local_column < 4u", "local_column < 2u").replaceAll("accumulator < 16u", "accumulator < 4u").replace("linear += 64u", "linear += 256u");
}
function batchedMatmulCode(code) {
  return code.replace(
    "  output_column_offset: u32,",
    "  output_column_offset: u32,\n  input_matrix_channels: u32,\n  batches: u32,"
  ).replace("  let row_group =", `  let column_groups = (params.output_channels + 31u) / 32u;
  let batch = group_id.x / column_groups;
  let column_group = group_id.x % column_groups;
  let row_group =`).replaceAll("group_id.x * 32u", "column_group * 32u").replaceAll(
    "+ params.output_column_offset + column",
    "+ params.output_column_offset + batch * params.output_channels + column"
  ).replace(
    "input_row * params.input_channels + input_k",
    "input_row * params.input_matrix_channels + select(batch * params.input_channels, 0u, (MATMUL_FLAGS & 131072u) != 0u) + input_k"
  ).replace(
    "params.weight_byte_offset + weight_index",
    "params.weight_byte_offset + batch * params.input_channels * params.weight_matrix_channels + weight_index"
  );
}
function quadMatmulCode(code) {
  const start = code.indexOf("    if ((MATMUL_FLAGS & 64512u) != 0u) {");
  const end = code.indexOf("    let partition_width", start);
  if (start < 0 || end < 0) throw new Error("Unrecognized retiled Ada matmul");
  code = code.slice(0, start) + `
    var quad = vec4<f32>(sums[0], sums[1], sums[2], sums[3]);
    var length = 16u;
    if ((MATMUL_FLAGS & 2048u) != 0u) { length = 8u; }
    if ((MATMUL_FLAGS & 4096u) != 0u) { length = 4u; }
    for (var start = 0u; start < 32u; start += length) {
      quad = quad_fdpa(local_id.y * 2u, local_id.x * 2u, start, length, quad);
    }
    sums[0] = quad.x; sums[1] = quad.y; sums[2] = quad.z; sums[3] = quad.w;
` + code.slice(end);
  return code.replace("@compute", QUAD_FDPA + "\n@compute");
}
var QUAD_FDPA;
var init_tiled2 = __esm({
  "../src/matmul/tiled.js"() {
    QUAD_FDPA = `
fn quad_fdpa(row: u32, column: u32, start: u32, count: u32, accumulator: vec4<f32>) -> vec4<f32> {
  var exponents = select(vec4<i32>(-21),
    max(vec4<i32>((bitcast<vec4<u32>>(abs(accumulator)) >> vec4<u32>(23u)) & vec4<u32>(255u))
      - vec4<i32>(127), vec4<i32>(-14)), accumulator != vec4<f32>(0.0));
  for (var k = start; k < start + count; k++) {
    let a = vec2<f32>(tile_a[row * 32u + k], tile_a[(row + 1u) * 32u + k]);
    let b = vec2<f32>(tile_b[k * 32u + column], tile_b[k * 32u + column + 1u]);
    let ea = vec2<i32>(e4m3_exponent(a.x), e4m3_exponent(a.y));
    let eb = vec2<i32>(e4m3_exponent(b.x), e4m3_exponent(b.y));
    let product_exponents = select(vec4<i32>(-21), ea.xxyy + eb.xyxy,
      (a.xxyy != vec4<f32>(0.0)) & (b.xyxy != vec4<f32>(0.0)));
    exponents = max(exponents, product_exponents);
  }
  let alignment = bitcast<vec4<f32>>(vec4<u32>(vec4<i32>(140) - exponents) << vec4<u32>(23u));
  var sums = trunc(accumulator * alignment);
  for (var k = start; k < start + count; k++) {
    let a = vec2<f32>(tile_a[row * 32u + k], tile_a[(row + 1u) * 32u + k]);
    let b = vec2<f32>(tile_b[k * 32u + column], tile_b[k * 32u + column + 1u]);
    sums += trunc((a.xxyy * b.xyxy) * alignment);
  }
  let scale = bitcast<vec4<f32>>(vec4<u32>(exponents + vec4<i32>(114)) << vec4<u32>(23u));
  // FP8 products and the incoming half accumulator cannot produce a nonzero
  // result below the smallest half subnormal. Native publishes zero as +0.
  let rounded = vec4<f32>(vec4<f16>(sums * scale));
  return select(rounded, vec4<f32>(0.0), rounded == vec4<f32>(0.0));
}
`;
  }
});

// ../src/matmul/packed-exponents.js
function packedExponentMatmulCode(code) {
  code = code.replace("var<workgroup> tile_b: array<f32, 1024>;", `var<workgroup> tile_b: array<f32, 1024>;
var<workgroup> tile_ea: array<u32, 256>;
var<workgroup> tile_eb: array<u32, 256>;`);
  const loadStart = code.indexOf("    for (var linear = local_index; linear < 1024u;");
  const loadEnd = code.indexOf("    workgroupBarrier();", loadStart);
  if (loadStart < 0 || loadEnd < 0) throw new Error("Missing quad tile loader");
  code = code.slice(0, loadStart) + `    let tile_outer = local_index / 8u;
    let tile_k = (local_index % 8u) * 4u;
    let input_row = row_group * 32u + tile_outer;
    let output_column = group_id.x * 32u + tile_outer;
    var ea = 0u;
    var eb = 0u;
    for (var part = 0u; part < 4u; part++) {
      let k = k_base + tile_k + part;
      var input_k = select(k, native_chained_input_index(k), (MATMUL_FLAGS & 16u) != 0u);
      if ((MATMUL_FLAGS & 128u) != 0u) { input_k = native_inverse_chained_input_index(k); }
      var a = 0.0;
      var b = 0.0;
      if (input_row < params.rows && k < params.input_channels) {
        a = input_values[input_row * params.input_channels + input_k];
      }
      if (output_column < params.output_channels && k < params.input_channels) {
        var weight_index: u32;
        if ((MATMUL_FLAGS & 64u) != 0u) {
          weight_index = expert_interleaved_weight_index(k, output_column,
            params.weight_matrix_channels, params.weight_column_offset);
        } else {
          weight_index = packed_weight_index(k, output_column + params.weight_column_offset,
            params.weight_matrix_channels);
        }
        b = decode_e4m3(packed_byte(params.weight_byte_offset + weight_index));
      }
      tile_a[tile_outer * 32u + tile_k + part] = a;
      tile_b[(tile_k + part) * 32u + tile_outer] = b;
      ea |= select(0u, u32(e4m3_exponent(a) + 106), a != 0.0) << (part * 8u);
      eb |= select(0u, u32(e4m3_exponent(b) + 106), b != 0.0) << (part * 8u);
    }
    tile_ea[local_index] = ea;
    tile_eb[local_index] = eb;
` + code.slice(loadEnd);
  const start = code.indexOf("  for (var k = start; k < start + count; k++) {", code.indexOf("fn quad_fdpa("));
  const end = code.indexOf("  let alignment", start);
  if (start < 0 || end < 0) throw new Error("Missing quad exponent loop");
  return code.slice(0, start) + `  var maximum = vec4<u32>(exponents + vec4<i32>(212));
  for (var k = start / 4u; k < (start + count) / 4u; k++) {
    let ea = vec2<u32>(tile_ea[row * 8u + k], tile_ea[(row + 1u) * 8u + k]);
    let eb = vec2<u32>(tile_eb[column * 8u + k], tile_eb[(column + 1u) * 8u + k]);
    let packed = ea.xxyy + eb.xyxy;
    maximum = max(maximum, packed & vec4<u32>(255u));
    maximum = max(maximum, (packed >> vec4<u32>(8u)) & vec4<u32>(255u));
    maximum = max(maximum, (packed >> vec4<u32>(16u)) & vec4<u32>(255u));
    maximum = max(maximum, packed >> vec4<u32>(24u));
  }
  exponents = vec4<i32>(maximum) - vec4<i32>(212);
` + code.slice(end);
}
var init_packed_exponents = __esm({
  "../src/matmul/packed-exponents.js"() {
  }
});

// ../src/matmul/padded.js
function paddedMatmulCode(code) {
  return code.replace("tile_eb: array<u32, 256>", "tile_eb: array<u32, 288>").replace("tile_eb[local_index] = eb;", "tile_eb[tile_outer * 9u + tile_k / 4u] = eb;").replaceAll("tile_eb[column * 8u + k]", "tile_eb[column * 9u + k]").replaceAll("tile_eb[(column + 1u) * 8u + k]", "tile_eb[(column + 1u) * 9u + k]");
}
var init_padded = __esm({
  "../src/matmul/padded.js"() {
  }
});

// ../src/matmul/weight-words.js
function weightWordMatmulCode(code) {
  const blockStart = code.indexOf("      if (output_column < params.output_channels && k < params.input_channels) {");
  const blockEnd = code.indexOf("\n      tile_a[", blockStart);
  if (blockStart < 0 || blockEnd < 0) throw new Error("Missing packed matrix weight load");
  const block = code.slice(blockStart, blockEnd);
  const addressStart = block.indexOf("        var weight_index: u32;");
  const addressEnd = block.indexOf("        b = decode_e4m3");
  if (addressStart < 0 || addressEnd < 0) throw new Error("Missing native weight address");
  const address = block.slice(addressStart, addressEnd);
  code = code.slice(0, blockStart) + `      if (k < params.input_channels) {
        b = decode_e4m3((weight_word >> (part * 8u)) & 255u);
      }` + code.slice(blockEnd);
  return code.replace("    var ea = 0u;", `    var weight_word = 0u;
    {
      let k = k_base + tile_k;
      if (output_column < params.output_channels && k < params.input_channels) {
${address}        let byte_offset = params.weight_byte_offset + weight_index;
        weight_word = packed_weights[byte_offset / 4u];
        let shift = (byte_offset % 4u) * 8u;
        if (shift != 0u) {
          weight_word = (weight_word >> shift)
            | (packed_weights[byte_offset / 4u + 1u] << (32u - shift));
        }
      }
    }
    var ea = 0u;`);
}
var init_weight_words = __esm({
  "../src/matmul/weight-words.js"() {
  }
});

// ../src/matmul/vector-loads.js
function vectorLoadMatmulCode(code) {
  code = code.replace(/fn ada_fp8_fdpa\([\s\S]*?\n}/, "").replace("tile_a: array<f32, 1024>", "tile_a: array<vec4<f32>, 256>").replace("tile_b: array<f32, 1024>", "tile_b: array<vec4<f32>, 288>").replace("    var ea = 0u;", "    var loaded_a = vec4<f32>(0);\n    var loaded_b = vec4<f32>(0);\n    var ea = 0u;").replace("tile_a[tile_outer * 32u + tile_k + part] = a;", "loaded_a[part] = a;").replace("tile_b[(tile_k + part) * 32u + tile_outer] = b;", "loaded_b[part] = b;").replace("    tile_ea[local_index] = ea;", `    tile_a[local_index] = loaded_a;
    tile_b[tile_outer * 9u + tile_k / 4u] = loaded_b;
    tile_ea[local_index] = ea;`);
  const start = code.indexOf("  for (var k = start; k < start + count; k++) {", code.indexOf("fn quad_fdpa("));
  const end = code.indexOf("  let scale", start);
  if (start < 0 || end < 0) throw new Error("Missing quad product loop");
  const terms = [..."xyzw"].map((c) => `    sums += trunc((vec4<f32>(a0.${c}, a0.${c}, a1.${c}, a1.${c})
      * vec4<f32>(b0.${c}, b1.${c}, b0.${c}, b1.${c})) * alignment);`).join("\n");
  return code.slice(0, start) + `  for (var k = start / 4u; k < (start + count) / 4u; k++) {
    let a0 = tile_a[row * 8u + k];
    let a1 = tile_a[(row + 1u) * 8u + k];
    let b0 = tile_b[column * 9u + k];
    let b1 = tile_b[(column + 1u) * 9u + k];
${terms}
  }
` + code.slice(end);
}
var init_vector_loads2 = __esm({
  "../src/matmul/vector-loads.js"() {
  }
});

// ../src/matmul/half-exponents.js
function halfExponentMatmulCode(code) {
  code = code.replace("tile_ea: array<u32, 256>", "tile_ea: array<vec4<f16>, 256>").replace("tile_eb: array<u32, 288>", "tile_eb: array<vec4<f16>, 288>").replace("    var ea = 0u;", "    var ea = vec4<f16>(-100);").replace("    var eb = 0u;", "    var eb = vec4<f16>(-100);").replace(
    "ea |= select(0u, u32(e4m3_exponent(a) + 106), a != 0.0) << (part * 8u);",
    "ea[part] = f16(select(-100, e4m3_exponent(a), a != 0.0));"
  ).replace(
    "eb |= select(0u, u32(e4m3_exponent(b) + 106), b != 0.0) << (part * 8u);",
    "eb[part] = f16(select(-100, e4m3_exponent(b), b != 0.0));"
  ).replace("fn quad_fdpa(", `fn maximum_half_exponent(v: vec4<f16>) -> f16 {
  let pair = max(v.xy, v.zw);
  return max(pair.x, pair.y);
}
fn quad_fdpa(`);
  const start = code.indexOf("  var maximum =", code.indexOf("fn quad_fdpa("));
  const end = code.indexOf("  let alignment", start);
  if (start < 0 || end < 0) throw new Error("Missing packed exponent reduction");
  return code.slice(0, start) + `  var maximum = vec4<f16>(exponents);
  for (var k = start / 4u; k < (start + count) / 4u; k++) {
    let a0 = tile_ea[row * 8u + k];
    let a1 = tile_ea[(row + 1u) * 8u + k];
    let b0 = tile_eb[column * 9u + k];
    let b1 = tile_eb[(column + 1u) * 9u + k];
    maximum = max(maximum, vec4<f16>(maximum_half_exponent(a0 + b0),
      maximum_half_exponent(a0 + b1), maximum_half_exponent(a1 + b0), maximum_half_exponent(a1 + b1)));
  }
  exponents = vec4<i32>(maximum);
` + code.slice(end);
}
var init_half_exponents = __esm({
  "../src/matmul/half-exponents.js"() {
  }
});

// ../src/matmul/bounded-half.js
function boundedHalfMatmulCode(code) {
  code = code.replace("tile_a: array<vec4<f32>, 256>", "tile_a: array<vec4<f16>, 256>").replace("tile_b: array<vec4<f32>, 288>", "tile_b: array<vec4<f16>, 288>").replace("var loaded_a = vec4<f32>(0);", "var loaded_a = vec4<f16>(0);").replace("var loaded_b = vec4<f32>(0);", "var loaded_b = vec4<f16>(0);").replace("loaded_a[part] = a;", "loaded_a[part] = f16(a * 4.0);").replace("loaded_b[part] = b;", "loaded_b[part] = f16(b * 4.0);").replace("  var sums = trunc(accumulator * alignment);", `  var sums = trunc(accumulator * alignment);
  let product_alignment = bitcast<vec4<f32>>(vec4<u32>(vec4<i32>(136) - exponents) << vec4<u32>(23u));`);
  const start = code.indexOf("    sums += trunc((vec4<f32>(a0.x");
  const end = code.indexOf("\n  }", start);
  if (start < 0 || end < 0) throw new Error("Missing vector products");
  const terms = [..."xyzw"].map((p) => `    sums += trunc(vec4<f32>(vec4<f16>(a0.${p}, a0.${p}, a1.${p}, a1.${p})
      * vec4<f16>(b0.${p}, b1.${p}, b0.${p}, b1.${p})) * product_alignment);`).join("\n");
  return code.slice(0, start) + terms + code.slice(end);
}
var init_bounded_half = __esm({
  "../src/matmul/bounded-half.js"() {
  }
});

// ../src/matmul/unrolled.js
function unrolledMatmulCode(code) {
  const begin = code.indexOf("fn quad_fdpa("), end = code.indexOf("\n}", begin) + 2;
  if (begin < 0 || end < 2) throw new Error("Missing quad reduction");
  const original = code.slice(begin, end), functions = [];
  for (const count of [4, 8, 16]) for (let start = 0; start < 32; start += count) {
    let body = original.replace("fn quad_fdpa(", `fn quad_fdpa_${count}_${start}(`).replace("start: u32, count: u32, ", "");
    const loop = "  for (var k = start / 4u; k < (start + count) / 4u; k++) {";
    while (body.includes(loop)) {
      const a2 = body.indexOf(loop), b2 = body.indexOf("\n  }", a2) + 4;
      if (b2 < 4) throw new Error("Missing matrix reduction loop end");
      const terms = body.slice(a2 + loop.length, b2 - 4);
      body = body.slice(0, a2) + Array.from({ length: count / 4 }, (_, i) => `  {
    let k = ${start / 4 + i}u;${terms}
  }`).join("\n") + body.slice(b2);
    }
    functions.push(body);
  }
  code = code.slice(0, begin) + functions.join("\n") + code.slice(end);
  const a = code.indexOf("    var length = 16u;"), b = code.indexOf("    sums[0] = quad.x;", a);
  if (a < 0 || b < 0) throw new Error("Missing native group dispatch");
  const calls = (count) => Array.from({ length: 32 / count }, (_, i) => `      quad = quad_fdpa_${count}_${i * count}(local_id.y * 2u, local_id.x * 2u, quad);`).join("\n");
  return code.slice(0, a) + `    if ((MATMUL_FLAGS & 2048u) != 0u) {
${calls(8)}
    } else if ((MATMUL_FLAGS & 4096u) != 0u) {
${calls(4)}
    } else {
${calls(16)}
    }
` + code.slice(b);
}
var init_unrolled2 = __esm({
  "../src/matmul/unrolled.js"() {
  }
});

// ../src/matmul/group-exponent.js
function groupExponentMatmulCode(code) {
  code = code.replace("  var maximum = vec4<f16>(exponents);", `  var maximum00 = vec4<f16>(f16(exponents.x));
  var maximum01 = vec4<f16>(f16(exponents.y));
  var maximum10 = vec4<f16>(f16(exponents.z));
  var maximum11 = vec4<f16>(f16(exponents.w));`);
  const begin = code.indexOf("    maximum = max(maximum, vec4<f16>(maximum_half_exponent");
  const end = code.indexOf("  exponents = vec4<i32>(maximum);", begin);
  if (begin < 0 || end < 0) throw new Error("Missing half exponent reduction");
  return code.slice(0, begin) + `    maximum00 = max(maximum00, a0 + b0);
    maximum01 = max(maximum01, a0 + b1);
    maximum10 = max(maximum10, a1 + b0);
    maximum11 = max(maximum11, a1 + b1);
  }
  let maximum = vec4<f16>(maximum_half_exponent(maximum00), maximum_half_exponent(maximum01),
    maximum_half_exponent(maximum10), maximum_half_exponent(maximum11));
` + code.slice(end);
}
var init_group_exponent = __esm({
  "../src/matmul/group-exponent.js"() {
  }
});

// ../src/matmul/seeded-exponent.js
function seededExponentMatmulCode(code) {
  for (const count of [4, 8, 16]) for (let first = 0; first < 32; first += count) {
    const begin = code.indexOf(`fn quad_fdpa_${count}_${first}(`);
    const end = code.indexOf("\n}", begin) + 2;
    if (begin < 0 || end < 2) throw new Error("Missing specialized exponent reduction");
    let body = code.slice(begin, end);
    for (const [name, a, b, component] of [
      ["00", "a0", "b0", "x"],
      ["01", "a0", "b1", "y"],
      ["10", "a1", "b0", "z"],
      ["11", "a1", "b1", "w"]
    ]) {
      body = body.replace(
        `var maximum${name} = vec4<f16>(f16(exponents.${component}));`,
        `var maximum${name}: vec4<f16>;`
      ).replace(
        `maximum${name} = max(maximum${name}, ${a} + ${b});`,
        `maximum${name} = ${a} + ${b};`
      );
    }
    body = body.replace(
      "  exponents = vec4<i32>(maximum);",
      "  exponents = max(exponents, vec4<i32>(maximum));"
    );
    code = code.slice(0, begin) + body + code.slice(end);
  }
  return code;
}
var init_seeded_exponent = __esm({
  "../src/matmul/seeded-exponent.js"() {
  }
});

// ../src/matmul/shape.js
function shapeMatmulCode(code) {
  for (const [field, constant] of [
    ["rows", "MATMUL_ROWS"],
    ["input_channels", "MATMUL_K"],
    ["output_channels", "MATMUL_N"]
  ]) {
    code = code.replace("struct MatmulParams", `override ${constant}: u32 = 32u;
struct MatmulParams`).replaceAll(`params.${field}`, constant);
  }
  return code.replaceAll("input_row < MATMUL_ROWS", "(MATMUL_ROWS % 32u == 0u || input_row < MATMUL_ROWS)").replace(/\bk < MATMUL_K/g, "(MATMUL_K % 32u == 0u || k < MATMUL_K)").replaceAll("output_column < MATMUL_N", "(MATMUL_N % 32u == 0u || output_column < MATMUL_N)").replace(/\brow < MATMUL_ROWS/g, "(MATMUL_ROWS % 32u == 0u || row < MATMUL_ROWS)").replace(/\bcolumn < MATMUL_N/g, "(MATMUL_N % 32u == 0u || column < MATMUL_N)");
}
var init_shape = __esm({
  "../src/matmul/shape.js"() {
  }
});

// ../src/matmul/layout.js
function layoutMatmulCode(code) {
  for (const [field] of MATMUL_LAYOUT_FIELDS) {
    if (!code.includes(`params.${field}`)) continue;
    const constant = `LAYOUT_${field.toUpperCase()}`;
    code = code.replace("struct MatmulParams", `override ${constant}: u32 = 0u;
struct MatmulParams`).replaceAll(`params.${field}`, constant);
  }
  return code.replace("  let row_group =", "  if (params.rows == 0u) { return; }\n  let row_group =");
}
var MATMUL_LAYOUT_FIELDS;
var init_layout2 = __esm({
  "../src/matmul/layout.js"() {
    MATMUL_LAYOUT_FIELDS = [
      ["weight_byte_offset", 3],
      ["bias_byte_offset", 4],
      ["weight_matrix_channels", 6],
      ["weight_column_offset", 7],
      ["output_matrix_channels", 8],
      ["output_column_offset", 9],
      ["input_matrix_channels", 10]
    ];
  }
});

// ../src/matmul/packed-residual.js
function packedResidualMatmulCode(code) {
  if (!code.includes("weight_metadata: array<vec2<f16>>")) {
    throw new Error("the packed skip decode needs the weight metadata table");
  }
  if (!code.includes("residual_values[output_index]")) throw new Error("Missing skip tensor read");
  return code.replace("residual_values: array<f32>", "residual_values: array<u32>").replaceAll("residual_values[output_index]", "load_residual(output_index)").replace("struct MatmulParams", `${LOAD}struct MatmulParams`);
}
var RESIDUAL_E4, LOAD;
var init_packed_residual = __esm({
  "../src/matmul/packed-residual.js"() {
    RESIDUAL_E4 = 262144;
    LOAD = `fn load_residual(index: u32) -> f32 {
  if ((MATMUL_FLAGS & ${RESIDUAL_E4}u) != 0u) {
    return f32(weight_metadata[(residual_values[index / 4u] >> ((index % 4u) * 8u)) & 255u].x) * 0.25;
  }
  return f32(bitcast<vec2<f16>>(residual_values[index / 2u])[index % 2u]);
}
`;
  }
});

// ../src/matmul/half-storage.js
function halfOutputMatmulCode(code) {
  if (!code.includes("output_values: array<f32>")) throw new Error("Missing the f32 publication to narrow");
  return code.replace("output_values: array<f32>", "output_values: array<f16>").replace(/output_values\[output_index\] = ([^;]+);/g, "output_values[output_index] = f16($1);");
}
function halfResidualMatmulCode(code) {
  if (!code.includes("residual_values: array<f32>")) throw new Error("Missing the f32 skip tensor");
  return code.replace("residual_values: array<f32>", "residual_values: array<f16>").replaceAll("residual_values[output_index]", "f32(residual_values[output_index])");
}
function rawHalfOutputMatmulCode(code) {
  const publish = "          published_pair |= publish_e4_code(value) << (local_column * 8u);";
  if (!code.includes(publish)) throw new Error("Missing the E4 publication to pair the half with");
  return code.replace(
    "struct MatmulParams",
    "@group(0) @binding(7) var<storage, read_write> raw_values: array<f16>;\nstruct MatmulParams"
  ).replace(publish, `${publish}
          raw_values[output_index] = f16(value);`);
}
var init_half_storage = __esm({
  "../src/matmul/half-storage.js"() {
  }
});

// ../src/matmul/tile128.js
function tile128MatmulCode(code) {
  const packedRows = code.includes("@workgroup_size(8, 32, 1)");
  if (!packedRows && !code.includes("@workgroup_size(16, 16, 1)")) throw new Error("Unknown matrix ownership");
  if (code.includes("tile_ea: array<vec2<u32>")) throw new Error("Pair-exchange packed output is unsupported");
  const rows = packedRows ? 1 : 2;
  const mainStart = code.indexOf("@compute");
  if (mainStart < 0) throw new Error("Missing matrix entry point");
  let main = code.slice(mainStart);
  main = main.replace(
    packedRows ? "@workgroup_size(8, 32, 1)" : "@workgroup_size(16, 16, 1)",
    packedRows ? "@workgroup_size(8, 16, 1)" : "@workgroup_size(16, 8, 1)"
  ).replaceAll(packedRows ? "local_id.y" : "local_id.y * 2u", `local_id.y * ${rows * 2}u`).replaceAll("array<f32, 4>()", "array<f32, 8>()").replaceAll(`local_row < ${rows}u`, `local_row < ${rows * 2}u`).replaceAll("accumulator < 4u", "accumulator < 8u");
  const loadBegin = main.indexOf("    let tile_outer = local_index / 8u;");
  const loadEnd = main.indexOf("    workgroupBarrier();", loadBegin);
  if (loadBegin < 0 || loadEnd < 0) throw new Error("Missing matrix tile loader");
  main = main.slice(0, loadBegin) + `    for (var tile_index = local_index; tile_index < 256u; tile_index += 128u) {
${main.slice(loadBegin, loadEnd).replaceAll("local_index", "tile_index")}    }
` + main.slice(loadEnd);
  const quadBegin = main.indexOf("    var quad = vec4<f32>");
  const quadEndText = "    sums[0] = quad.x; sums[1] = quad.y; sums[2] = quad.z; sums[3] = quad.w;";
  const quadEnd = main.indexOf(quadEndText, quadBegin) + quadEndText.length;
  if (quadBegin < 0 || quadEnd < quadEndText.length) throw new Error("Missing native output quads");
  let quads = main.slice(quadBegin, quadEnd).replaceAll("quad", "quad0").replaceAll("quad0_fdpa_", "quad_fdpa_");
  quads = quads.replace(
    "    var quad0 = vec4<f32>(sums[0], sums[1], sums[2], sums[3]);",
    "    var quad0 = vec4<f32>(sums[0], sums[1], sums[2], sums[3]);\n    var quad1 = vec4<f32>(sums[4], sums[5], sums[6], sums[7]);"
  );
  let calls = 0;
  quads = quads.replace(
    /      quad0 = quad_fdpa_\d+_\d+\(([^,]+), ([^,]+), quad0\);/g,
    (line, row, column) => {
      calls++;
      return line + "\n" + line.replaceAll("quad0", "quad1").replace(`(${row}, ${column},`, `(${row} + ${rows}u, ${column},`);
    }
  );
  if (calls !== 14) throw new Error(`Expected 14 original reduction calls, got ${calls}`);
  quads += "\n    sums[4] = quad1.x; sums[5] = quad1.y; sums[6] = quad1.z; sums[7] = quad1.w;";
  return code.slice(0, mainStart) + main.slice(0, quadBegin) + quads + main.slice(quadEnd);
}
var init_tile128 = __esm({
  "../src/matmul/tile128.js"() {
  }
});

// ../src/matmul/variants.js
function sharedReduction() {
  if (reduction) return reduction;
  const quad = quadMatmulCode(retileMatmulCode(productionMatmulCode()));
  const words = vectorLoadMatmulCode(weightWordMatmulCode(paddedMatmulCode(packedExponentMatmulCode(quad))));
  const grouped = unrolledMatmulCode(
    groupExponentMatmulCode(boundedHalfMatmulCode(halfExponentMatmulCode(words)))
  );
  reduction = seededExponentMatmulCode(grouped);
  return reduction;
}
function variantCode({ output: output2, residual, batched, tile128 }) {
  let code = sharedReduction();
  if (batched) code = batchedMatmulCode(code);
  code = weightTableMatmulCode(siluTableMatmulCode(bitQuantMatmulCode(layoutMatmulCode(shapeMatmulCode(code)))));
  code = residual === "e4" ? packedResidualMatmulCode(code) : halfResidualMatmulCode(code);
  if (output2 === "half") {
    code = halfOutputMatmulCode(packedActivationMatmulCode(code, { input: true, prefetch: true }));
  } else {
    code = packedActivationMatmulCode(code, { input: true, output: true, prefetch: true, rowOutput: true });
    if (output2 === "dual") code = rawHalfOutputMatmulCode(code);
  }
  return tile128 ? tile128MatmulCode(code) : code;
}
var reduction, variantKey;
var init_variants2 = __esm({
  "../src/matmul/variants.js"() {
    init_base2();
    init_tiled2();
    init_packed_exponents();
    init_padded();
    init_weight_words();
    init_vector_loads2();
    init_half_exponents();
    init_bounded_half();
    init_unrolled2();
    init_group_exponent();
    init_seeded_exponent();
    init_shape();
    init_layout2();
    init_bit_quant();
    init_silu_table();
    init_weight_table();
    init_packed_activation();
    init_packed_residual();
    init_half_storage();
    init_tile128();
    reduction = null;
    variantKey = ({ output: output2, residual, batched, tile128 }) => `${output2}/${residual}${batched ? "/batched" : ""}${tile128 ? "/tile128" : ""}`;
  }
});

// ../src/matmul/index.js
var FLAG_RESIDUAL, FLAG_SILU, FLAG_SCALE_RESIDUAL, FLAG_SWIZZLE_INPUT, FLAG_QUANTIZE_OUTPUT, FLAG_BROADCAST_INPUT, PARTITION_FLAGS, LAYOUT_FIELDS, Matmul;
var init_matmul = __esm({
  "../src/matmul/index.js"() {
    init_pipeline_compiler();
    init_silu_table();
    init_weight_table();
    init_packed_activation();
    init_bit_quant();
    init_base2();
    init_variants2();
    init_packed_residual();
    FLAG_RESIDUAL = 2;
    FLAG_SILU = 4;
    FLAG_SCALE_RESIDUAL = 8;
    FLAG_SWIZZLE_INPUT = 16;
    FLAG_QUANTIZE_OUTPUT = 32;
    FLAG_BROADCAST_INPUT = 131072;
    PARTITION_FLAGS = /* @__PURE__ */ new Map([[0, 1024], [1024, 8192], [512, 16384], [256, 32768]]);
    LAYOUT_FIELDS = [
      "WEIGHT_BYTE_OFFSET",
      "BIAS_BYTE_OFFSET",
      "WEIGHT_MATRIX_CHANNELS",
      "WEIGHT_COLUMN_OFFSET",
      "OUTPUT_MATRIX_CHANNELS",
      "OUTPUT_COLUMN_OFFSET"
    ];
    Matmul = class _Matmul {
      static async create(device) {
        const matmul = new _Matmul();
        matmul.device = device;
        matmul.modules = /* @__PURE__ */ new Map();
        matmul.siluTable = await createSiluTable(device, bitQuantMatmulCode(productionMatmulCode()));
        matmul.packedSiluTable = await createPackedSiluTable(device, matmul.siluTable);
        matmul.weightMetadata = createWeightMetadataTable(device);
        return matmul;
      }
      module(variant) {
        const key2 = variantKey(variant);
        let module = this.modules.get(key2);
        if (!module) {
          module = this.device.createShaderModule({ label: `gemm ${key2}`, code: variantCode(variant) });
          this.modules.set(key2, module);
        }
        return module;
      }
      /**
       * The pipeline for one matrix multiply. `flags` selects the options, the rest are the shape and the strides
       * the kernel is specialized to.
       */
      pipeline(layout, variant, {
        flags,
        rows,
        k,
        n,
        weightByteOffset,
        biasByteOffset,
        weightMatrixChannels,
        outputMatrixChannels,
        inputMatrixChannels
      }) {
        const constants = {
          MATMUL_FLAGS: flags,
          MATMUL_ROWS: rows,
          MATMUL_K: k,
          MATMUL_N: n,
          LAYOUT_WEIGHT_BYTE_OFFSET: weightByteOffset,
          LAYOUT_BIAS_BYTE_OFFSET: biasByteOffset,
          LAYOUT_WEIGHT_MATRIX_CHANNELS: weightMatrixChannels,
          LAYOUT_WEIGHT_COLUMN_OFFSET: 0,
          LAYOUT_OUTPUT_MATRIX_CHANNELS: outputMatrixChannels,
          LAYOUT_OUTPUT_COLUMN_OFFSET: 0,
          ...variant.batched ? { LAYOUT_INPUT_MATRIX_CHANNELS: inputMatrixChannels } : {}
        };
        for (const field of LAYOUT_FIELDS) {
          if (constants[`LAYOUT_${field}`] === void 0) throw new Error(`gemm is missing LAYOUT_${field}`);
        }
        return compileComputePipeline(this.device, {
          label: `gemm ${variantKey(variant)} ${rows}x${k}x${n}`,
          layout,
          compute: { module: this.module(variant), entryPoint: "main", constants }
        });
      }
      /** The table the publication reads: the E4M3 bytes for a packed output, the halves otherwise. */
      siluTableFor(output2) {
        return output2 === "half" ? this.siluTable : this.packedSiluTable;
      }
      static partitionFlag(span) {
        const flag = PARTITION_FLAGS.get(span);
        if (flag === void 0) throw new Error(`no K partition of ${span}`);
        return flag;
      }
      // The three tables are built once per device and shared by every graph on it, exactly like the weights,
      // so tearing a graph down leaves them alone. The host rebuilds the graph on every resize.
      destroy() {
      }
    };
  }
});

// ../src/graph.js
function grid1d(count) {
  const groups = Math.ceil(count / 64);
  if (groups <= MAX_GROUPS) return [groups, 1];
  return [MAX_GROUPS, Math.ceil(groups / MAX_GROUPS)];
}
var WRITE_E4, WRITE_F16, WRITE_F32, DUAL, MAX_GROUPS, Graph2;
var init_graph = __esm({
  "../src/graph.js"() {
    init_geometry();
    init_matmul();
    init_window();
    WRITE_E4 = 2;
    WRITE_F16 = 4;
    WRITE_F32 = 32;
    DUAL = 1;
    MAX_GROUPS = 65535;
    Graph2 = class {
      /**
       * @param {object} context {device, kernels, tensors, model, geometry}
       * @param {object} options {captureBoundaries} - keep a copy of every block output, for the parity harness
       */
      constructor(context, options = {}) {
        Object.assign(this, context);
        this.options = options;
        this.phases = new WindowPhases();
        this.boundaries = /* @__PURE__ */ new Map();
        if (this.model.blockCount !== 71) {
          throw new Error(`the model has ${this.model.blockCount} blocks; this graph is the 71-block network`);
        }
      }
      // -------------------------------------------------------------------------------------------------------
      // The kernels, as the graph wants to call them.
      // -------------------------------------------------------------------------------------------------------
      /**
       * One FP8 matrix multiply. `residual`, when given, is not added afterwards - it is the value the
       * accumulator starts from, scaled by the block's learned per-channel vector. That ordering is the whole
       * difference between this and a matmul followed by an add.
       *
       * Every argument that is not a buffer ends up as a pipeline override, so two calls that differ only in
       * shape are two pipelines. src/matmul/ is where that goes.
       */
      gemm({
        input,
        weights,
        output: output2,
        outputF16,
        rows,
        k,
        n,
        batches = 1,
        broadcast = false,
        partition = 0,
        silu = false,
        residual = null,
        aux = 0,
        label
      }) {
        const target = output2 ?? outputF16;
        const mode2 = output2 && outputF16 ? "dual" : output2 ? "e4" : "half";
        if (output2 && outputF16 && output2.channels !== outputF16.channels) {
          throw new Error(`${label} publishes both tensors at one index, so they must share a stride`);
        }
        if (mode2 !== "e4" && silu) throw new Error(`${label} activates on a boundary that is not E4M3`);
        if (residual && residual.channels !== target.channels) {
          throw new Error(`${label} reads its skip at the output index, so the strides must agree`);
        }
        const batched = batches > 1 || input.channels !== k;
        if (weights.k !== k * batches || weights.batchK !== k) {
          throw new Error(`${label} dispatches ${batches}x${k} against a ${weights.k} matrix`);
        }
        let flags = Matmul.partitionFlag(partition) | FLAG_SWIZZLE_INPUT;
        if (silu) flags |= FLAG_SILU;
        if (mode2 !== "half") flags |= FLAG_QUANTIZE_OUTPUT;
        if (broadcast) flags |= FLAG_BROADCAST_INPUT;
        if (residual) {
          flags |= FLAG_RESIDUAL | FLAG_SCALE_RESIDUAL;
          if (residual.format === "e4") flags |= RESIDUAL_E4;
        }
        const variant = {
          output: mode2,
          residual: residual?.format === "half" ? "half" : "e4",
          batched,
          tile128: true
        };
        const pipeline = this.matmul.pipeline(this.kernels.gemmPipelineLayout, variant, {
          flags,
          rows,
          k,
          n,
          weightByteOffset: weights.byteOffset,
          biasByteOffset: aux,
          weightMatrixChannels: weights.matrixChannels,
          outputMatrixChannels: target.channels,
          inputMatrixChannels: input.channels
        });
        const params = new Uint32Array([
          rows,
          k,
          n,
          weights.byteOffset,
          aux,
          flags,
          weights.matrixChannels,
          0,
          target.channels,
          0,
          input.channels,
          batches
        ]);
        const rowTiles = Math.ceil(rows / 32);
        this.recorder.specialized(pipeline, { kernel: "gemm_fp8", gemm: true }, {
          0: input.buffer,
          1: weights.buffer,
          2: target.buffer,
          3: residual ? residual.buffer : void 0,
          5: this.matmul.siluTableFor(mode2),
          6: this.matmul.weightMetadata,
          7: mode2 === "dual" ? outputF16.buffer : void 0
        }, params, [
          Math.ceil(n / 32) * batches,
          Math.min(rowTiles, MAX_GROUPS),
          Math.ceil(rowTiles / MAX_GROUPS)
        ], label);
      }
      /** The f16 matrix multiply: only the input adapter and the head. */
      gemmF16({ input, weights, paddedN, output: output2, outputF16, outputF32, rows, k, n, label }) {
        let flags = 0;
        if (output2) flags |= WRITE_E4;
        if (outputF16) flags |= WRITE_F16;
        if (outputF32) flags |= WRITE_F32;
        const target = outputF32 ?? outputF16 ?? output2;
        const params = new Uint32Array([rows, k, n, paddedN, input.channels, target.channels, flags, 0]);
        this.recorder.pass("gemm_f16", {
          1: input.buffer,
          2: weights,
          5: output2 ? output2.buffer : void 0,
          6: outputF16 ? outputF16.buffer : void 0,
          7: outputF32 ? outputF32.buffer : void 0
        }, params, grid1d(rows * (n / 4)), label);
      }
      op(entryPoint, {
        count,
        channels,
        inWidth = 0,
        inHeight = 0,
        outWidth = 0,
        outHeight = 0,
        auxA = 0,
        auxB = 0,
        dual = false,
        inF32,
        inF16,
        inE4,
        skipE4,
        aux,
        outE4,
        outF16,
        label
      }) {
        const params = new Uint32Array([
          count,
          channels,
          inWidth,
          inHeight,
          outWidth,
          outHeight,
          auxA,
          auxB,
          dual ? DUAL : 0,
          0,
          0,
          0
        ]);
        this.recorder.pass(entryPoint, {
          1: inF32?.buffer,
          2: inF16?.buffer,
          3: inE4?.buffer,
          4: skipE4?.buffer,
          8: aux,
          6: outE4?.buffer,
          7: outF16?.buffer
        }, params, grid1d(count / 4), label);
      }
      /**
       * One shifted-window attention. The cosine normalization is part of this kernel rather than a pass of its
       * own: it is eight lanes per token over the raw qkv, and fusing it means the normalized tensor is never
       * written or read back. src/window/ is where the kernel comes from.
       */
      windowAttention({ qkv, attended, prior, scales, width, height, heads, phase, label }) {
        const [shiftX, shiftY] = windowPhase(phase);
        const windowsX = Math.ceil((width + shiftX) / 8);
        const windowsY = Math.ceil((height + shiftY) / 8);
        const tasks = windowsX * windowsY * (64 / WINDOW_QUERIES);
        const geometry = { width, height, channels: heads * 32, shiftX, shiftY, relativeBias: 1 };
        const params = new Uint32Array([width * height, heads, width, height, heads * 32, shiftX, shiftY, 1]);
        this.recorder.specialized(
          this.window.pipeline(this.kernels.pipelineLayout, geometry),
          { kernel: "window_attend" },
          { 1: qkv.buffer, 2: scales, 3: prior, 6: attended.buffer },
          params,
          [heads, Math.min(tasks, MAX_GROUPS), Math.ceil(tasks / MAX_GROUPS)],
          `${label} attend`
        );
      }
      // -------------------------------------------------------------------------------------------------------
      tensorFor(label, rows, channels, format) {
        return this.tensors.allocate(label, rows, channels, format);
      }
      capture(name, source) {
        if (!this.options.captureBoundaries) return;
        const copy = this.tensors.allocate(`boundary ${name}`, source.rows, source.channels, source.format);
        this.recorder.copy(source.buffer, copy.buffer, copy.byteLength, `capture ${name}`);
        this.boundaries.set(name, copy);
      }
      // -------------------------------------------------------------------------------------------------------
      // One block.
      // -------------------------------------------------------------------------------------------------------
      /**
       * FFN -> QKV -> window attention -> projection, with the two scaled skips that make it a residual block.
       *
       * Under 64 channels the FFN is one dense C -> 128 -> C path. At 64 and above it is C/32 independent experts,
       * each C -> 128 -> 32, whose 32-wide outputs are concatenated and run through one more C -> C layer; that
       * last layer is what carries the FFN's skip.
       */
      block({
        block,
        channels,
        width,
        height,
        layout,
        tensor,
        temps,
        state: state2,
        output: output2,
        outputF16 = null,
        ffnSkipOverride = null,
        phase
      }) {
        const rows = width * height;
        const model = this.model;
        const label = `block ${block}`;
        const residual = ffnSkipOverride ?? state2;
        const ffnAux = model.auxOffset(tensor, layout.ffnCosSkip, channels);
        if (layout.expertFfn) {
          const experts = layout.expertCount;
          const w2Base = layout.expand + experts * channels * 128;
          const w3Base = w2Base + experts * 128 * 32;
          this.gemm({
            input: state2,
            weights: model.fp8Matrix(tensor, layout.expand, experts * channels, 128, { batchK: channels }),
            output: temps.ffn,
            rows,
            k: channels,
            n: 128,
            batches: experts,
            broadcast: true,
            silu: true,
            label: `${label} expert expand`
          });
          this.gemm({
            input: temps.ffn,
            weights: model.fp8Matrix(tensor, w2Base, experts * 128, 32, { batchK: 128 }),
            output: temps.ffnNarrow,
            rows,
            k: 128,
            n: 32,
            batches: experts,
            label: `${label} expert contract`
          });
          this.gemm({
            input: temps.ffnNarrow,
            weights: model.fp8Matrix(tensor, w3Base, channels, channels),
            output: temps.ffnQuantized,
            outputF16: temps.ffnResidual,
            rows,
            k: channels,
            n: channels,
            residual,
            aux: ffnAux,
            label: `${label} expert merge`
          });
        } else {
          this.gemm({
            input: state2,
            weights: model.fp8Matrix(tensor, layout.expand, channels, layout.hidden),
            output: temps.ffn,
            rows,
            k: channels,
            n: layout.hidden,
            silu: true,
            label: `${label} expand`
          });
          this.gemm({
            input: temps.ffn,
            weights: model.fp8Matrix(tensor, layout.contractWeights, layout.hidden, channels),
            output: temps.ffnQuantized,
            outputF16: temps.ffnResidual,
            rows,
            k: layout.hidden,
            n: channels,
            residual,
            aux: ffnAux,
            label: `${label} contract`
          });
        }
        this.gemm({
          input: temps.ffnQuantized,
          weights: model.fp8Matrix(tensor, layout.qkv, channels, channels * 3),
          outputF16: temps.qkv,
          rows,
          k: channels,
          n: channels * 3,
          label: `${label} qkv`
        });
        this.windowAttention({
          qkv: temps.qkv,
          attended: temps.attended,
          prior: model.relativeBias(tensor, layout.relative, layout.heads),
          scales: model.headScales(tensor, layout.scale, layout.heads),
          width,
          height,
          heads: layout.heads,
          phase,
          label
        });
        this.gemm({
          input: temps.attended,
          weights: model.fp8Matrix(tensor, layout.projection, channels, channels),
          output: output2,
          outputF16,
          rows,
          k: channels,
          n: channels,
          residual: layout.expertFfn ? temps.ffnQuantized : temps.ffnResidual,
          aux: model.auxOffset(tensor, layout.attnCosSkip, channels),
          label: `${label} projection`
        });
      }
      /**
       * The 512 stage. Its FFN is not the expert pattern: eight independent 64-wide branches, each widened to 256
       * and brought back, with the activation on the middle layer only, all on top of one 512 -> 512 layer.
       */
      splitBlock({ block, width, height, temps, state: state2, output: output2, outputF16 = null, phase }) {
        const rows = width * height;
        const model = this.model;
        const label = `block ${block}`;
        const channels = 512, branches = 8, branchChannels = 64, middleChannels = 256, heads = 16;
        const branchTensor = model.tensor(block, 0);
        const contract = model.tensor(block, 1);
        const qkvTensor = model.tensor(block, 2);
        const projection = model.tensor(block, 3);
        const w2Base = branches * channels * branchChannels;
        const w3Base = w2Base + branches * branchChannels * middleChannels;
        const qkvRelative = channels * channels * 3;
        const qkvScale = qkvRelative + heads * 8192;
        this.gemm({
          input: state2,
          weights: model.fp8Matrix(branchTensor, 0, channels, channels),
          output: temps.branch,
          rows,
          k: channels,
          n: channels,
          label: `${label} split layer0`
        });
        this.gemm({
          input: temps.branch,
          weights: model.fp8Matrix(
            branchTensor,
            w2Base,
            branches * branchChannels,
            middleChannels,
            { batchK: branchChannels }
          ),
          output: temps.middle,
          rows,
          k: branchChannels,
          n: middleChannels,
          batches: branches,
          silu: true,
          label: `${label} split expand`
        });
        this.gemm({
          input: temps.middle,
          weights: model.fp8Matrix(
            branchTensor,
            w3Base,
            branches * middleChannels,
            branchChannels,
            { batchK: middleChannels }
          ),
          output: temps.layer0,
          rows,
          k: middleChannels,
          n: branchChannels,
          batches: branches,
          label: `${label} split contract`
        });
        this.gemm({
          input: temps.layer0,
          weights: model.fp8Matrix(contract, 0, channels, channels),
          output: temps.ffnResidual,
          rows,
          k: channels,
          n: channels,
          residual: state2,
          aux: model.auxOffset(contract, channels * channels, channels),
          label: `${label} split merge`
        });
        this.gemm({
          input: temps.ffnResidual,
          weights: model.fp8Matrix(qkvTensor, 0, channels, channels * 3),
          outputF16: temps.qkv,
          rows,
          k: channels,
          n: channels * 3,
          label: `${label} qkv`
        });
        this.windowAttention({
          qkv: temps.qkv,
          attended: temps.attended,
          prior: model.relativeBias(qkvTensor, qkvRelative, heads),
          scales: model.headScales(qkvTensor, qkvScale, heads),
          width,
          height,
          heads,
          phase,
          label
        });
        this.gemm({
          input: temps.attended,
          weights: model.fp8Matrix(projection, 0, channels, channels),
          output: output2,
          outputF16,
          rows,
          k: channels,
          n: channels,
          residual: temps.ffnResidual,
          aux: model.auxOffset(projection, channels * channels, channels),
          label: `${label} projection`
        });
      }
      /** The global ViT: eight blocks whose attention spans every token of the coarsest level. */
      vit(state2, tokens) {
        const channels = 1024, heads = 32, ffnChannels = 4096;
        const padded = this.geometry.paddedVitTokens;
        const model = this.model;
        const expanded = this.tensorFor("vit expand", tokens, ffnChannels, "e4");
        const ffnResidual = this.tensorFor("vit residual", tokens, channels, "e4");
        const qkv = this.tensorFor("vit qkv", tokens, channels * 3, "f16");
        const normalized = this.tensorFor("vit normalized", padded, channels * 3, "e4");
        const attended = this.tensorFor("vit attended", tokens, channels, "e4");
        for (let block = 31; block <= 38; ++block) {
          const expand = model.tensor(block, 0);
          const contract = model.tensor(block, 1);
          const qkvTensor = model.tensor(block, 2);
          const projection = model.tensor(block, 4);
          const label = `block ${block}`;
          this.gemm({
            input: state2,
            weights: model.fp8Matrix(expand, 0, channels, ffnChannels),
            output: expanded,
            rows: tokens,
            k: channels,
            n: ffnChannels,
            silu: true,
            label: `${label} expand`
          });
          this.gemm({
            input: expanded,
            weights: model.fp8Matrix(contract, 0, ffnChannels, channels),
            output: ffnResidual,
            rows: tokens,
            k: ffnChannels,
            n: channels,
            partition: 1024,
            residual: state2,
            aux: model.auxOffset(contract, ffnChannels * channels, channels),
            label: `${label} contract`
          });
          this.gemm({
            input: ffnResidual,
            weights: model.fp8Matrix(qkvTensor, heads * 4, channels, channels * 3),
            outputF16: qkv,
            rows: tokens,
            k: channels,
            n: channels * 3,
            partition: 512,
            label: `${label} qkv`
          });
          const params = new Uint32Array([tokens, heads, channels, padded]);
          this.recorder.pass(
            "vit_normalize",
            { 1: qkv.buffer, 2: model.headScales(qkvTensor, 0, heads), 5: normalized.buffer },
            params,
            grid1d(tokens * heads * 8),
            `${label} normalize`
          );
          this.recorder.pass(
            "vit_attend",
            { 4: normalized.buffer, 6: attended.buffer },
            params,
            [heads, tokens, 1],
            `${label} attend`
          );
          this.gemm({
            input: attended,
            weights: model.fp8Matrix(projection, 0, channels, channels),
            output: state2,
            rows: tokens,
            k: channels,
            n: channels,
            partition: 256,
            residual: ffnResidual,
            aux: model.auxOffset(projection, channels * channels, channels),
            label: `${label} projection`
          });
          this.capture(`block-${block}`, state2);
        }
      }
      // -------------------------------------------------------------------------------------------------------
      temporaries(label, rows, channels, layout) {
        const hidden = layout.expertFfn ? layout.expertCount * 128 : layout.hidden;
        return {
          ffn: this.tensorFor(`${label} ffn`, rows, hidden, "e4"),
          ffnNarrow: layout.expertFfn ? this.tensorFor(`${label} ffn narrow`, rows, channels, "e4") : null,
          ffnResidual: this.tensorFor(`${label} ffn residual`, rows, channels, "f16"),
          ffnQuantized: this.tensorFor(`${label} ffn quantized`, rows, channels, "e4"),
          qkv: this.tensorFor(`${label} qkv`, rows, channels * 3, "f16"),
          attended: this.tensorFor(`${label} attended`, rows, channels, "e4")
        };
      }
      splitTemporaries(label, rows) {
        return {
          branch: this.tensorFor(`${label} branch`, rows, 512, "e4"),
          middle: this.tensorFor(`${label} middle`, rows, 2048, "e4"),
          layer0: this.tensorFor(`${label} layer0`, rows, 512, "e4"),
          ffnResidual: this.tensorFor(`${label} split residual`, rows, 512, "e4"),
          qkv: this.tensorFor(`${label} split qkv`, rows, 1536, "f16"),
          attended: this.tensorFor(`${label} split attended`, rows, 512, "e4")
        };
      }
      /** Record the whole network. `features` is f32 [fullRows][16]. */
      record(recorder, features) {
        this.recorder = recorder;
        this.phases.reset();
        const g = this.geometry;
        const model = this.model;
        const fullRows = g.fullRows;
        const [d0, d1, d2, d3, d4, d5] = g.levels;
        const preTensor = model.tensor(0);
        const preLayout = preFusedLayout();
        if (preTensor.byteLength !== preLayout.endWithoutPadding + 16) throw new Error("unexpected block 0 layout");
        const featuresHalf = this.tensorFor("features f16", fullRows, 16, "f16");
        this.op("convert_f32_to_f16", {
          count: fullRows * 16,
          channels: 16,
          inF32: features,
          outF16: featuresHalf,
          label: "features to half"
        });
        const adapterF16 = this.tensorFor("adapter f16", fullRows, 32, "f16");
        const adapterE4 = this.tensorFor("adapter e4", fullRows, 32, "e4");
        {
          const { buffer, paddedN } = model.f16Matrix(preTensor, preLayout.inputAdapter, 16, 32);
          this.gemmF16({
            input: featuresHalf,
            weights: buffer,
            paddedN,
            output: adapterE4,
            outputF16: adapterF16,
            rows: fullRows,
            k: 16,
            n: 32,
            label: "input adapter"
          });
        }
        const block0 = this.tensorFor("block 0 out", fullRows, 32, "e4");
        const block0Raw = this.tensorFor("block 0 raw", fullRows, 32, "f16");
        const fullTemps = this.temporaries("full", fullRows, 32, preLayout);
        this.block({
          block: 0,
          channels: 32,
          width: g.fullWidth,
          height: g.fullHeight,
          layout: preLayout,
          tensor: preTensor,
          temps: fullTemps,
          state: adapterE4,
          output: block0,
          outputF16: block0Raw,
          ffnSkipOverride: adapterF16,
          phase: this.phases.take(6)
        });
        this.capture("block-0", block0);
        const rows0 = d0.rows;
        let state2 = this.tensorFor("level0 in", rows0, 32, "e4");
        this.op("downsample", {
          count: rows0 * 32,
          channels: 32,
          inWidth: g.fullWidth,
          inHeight: g.fullHeight,
          outWidth: d0.width,
          outHeight: d0.height,
          inF16: block0Raw,
          outE4: state2,
          label: "pool 0"
        });
        this.capture("transition-0-1", state2);
        let scratch2 = this.tensorFor("level0 state", rows0, 32, "e4");
        const level0Raw = this.tensorFor("level0 raw", rows0, 32, "f16");
        const level0Temps = this.temporaries("level0", rows0, 32, fusedLayout(32));
        for (let block = 1; block <= 4; ++block) {
          this.block({
            block,
            channels: 32,
            width: d0.width,
            height: d0.height,
            layout: fusedLayout(32),
            tensor: model.tensor(block),
            temps: level0Temps,
            state: state2,
            output: scratch2,
            outputF16: block === 4 ? level0Raw : null,
            phase: this.phases.take(0)
          });
          [state2, scratch2] = [scratch2, state2];
          this.capture(`block-${block}`, state2);
        }
        const skip32 = state2;
        const pooled32 = this.tensorFor("pool 4", d1.rows, 32, "e4");
        this.op("downsample", {
          count: d1.rows * 32,
          channels: 32,
          inWidth: d0.width,
          inHeight: d0.height,
          outWidth: d1.width,
          outHeight: d1.height,
          inF16: level0Raw,
          outE4: pooled32,
          label: "pool 4"
        });
        this.capture("pooled-4-5", pooled32);
        let stageInput = this.tensorFor("stage 64 in", d1.rows, 64, "e4");
        this.gemm({
          input: pooled32,
          weights: model.fp8Matrix(model.tensor(4), fusedLayout(32).endWithoutPadding, 32, 64),
          output: stageInput,
          rows: d1.rows,
          k: 32,
          n: 64,
          label: "transition 4-5"
        });
        this.capture("transition-4-5", stageInput);
        const encoderStages = [
          { level: d1, next: d2, channels: 64, first: 5, last: 8, levelIndex: 1 },
          { level: d2, next: d3, channels: 128, first: 9, last: 14, levelIndex: 2 },
          { level: d3, next: d4, channels: 256, first: 15, last: 22, levelIndex: 3 }
        ];
        const skips = [];
        for (const stage of encoderStages) {
          const rows = stage.level.rows;
          const label = `encoder ${stage.channels}`;
          const layout = fusedLayout(stage.channels);
          let st = stageInput;
          let sc = this.tensorFor(`${label} state`, rows, stage.channels, "e4");
          const raw = this.tensorFor(`${label} raw`, rows, stage.channels, "f16");
          const temps = this.temporaries(label, rows, stage.channels, layout);
          for (let block = stage.first; block <= stage.last; ++block) {
            this.block({
              block,
              channels: stage.channels,
              width: stage.level.width,
              height: stage.level.height,
              layout,
              tensor: model.tensor(block),
              temps,
              state: st,
              output: sc,
              outputF16: block === stage.last ? raw : null,
              phase: this.phases.take(stage.levelIndex)
            });
            [st, sc] = [sc, st];
            this.capture(`block-${block}`, st);
          }
          skips.push(st);
          const pooled = this.tensorFor(`${label} pooled`, stage.next.rows, stage.channels, "e4");
          this.op("downsample", {
            count: stage.next.rows * stage.channels,
            channels: stage.channels,
            inWidth: stage.level.width,
            inHeight: stage.level.height,
            outWidth: stage.next.width,
            outHeight: stage.next.height,
            inF16: raw,
            outE4: pooled,
            label: `pool ${stage.last}`
          });
          this.capture(`pooled-${stage.last}-${stage.last + 1}`, pooled);
          const next = this.tensorFor(`${label} next`, stage.next.rows, stage.channels * 2, "e4");
          this.gemm({
            input: pooled,
            weights: model.fp8Matrix(
              model.tensor(stage.last),
              layout.endWithoutPadding,
              stage.channels,
              stage.channels * 2
            ),
            output: next,
            rows: stage.next.rows,
            k: stage.channels,
            n: stage.channels * 2,
            label: `transition ${stage.last}`
          });
          this.capture(`transition-${stage.last}-${stage.last + 1}`, next);
          stageInput = next;
        }
        const [skip64, skip128, skip256] = skips;
        let skip512;
        {
          const rows = d4.rows;
          let st = stageInput;
          let sc = this.tensorFor("encoder 512 state", rows, 512, "e4");
          const raw = this.tensorFor("encoder 512 raw", rows, 512, "f16");
          const temps = this.splitTemporaries("encoder 512", rows);
          for (let block = 23; block <= 30; ++block) {
            this.splitBlock({
              block,
              width: d4.width,
              height: d4.height,
              temps,
              state: st,
              output: sc,
              outputF16: block === 30 ? raw : null,
              phase: this.phases.take(4)
            });
            [st, sc] = [sc, st];
            this.capture(`block-${block}`, st);
          }
          skip512 = st;
          const tokens = g.vitTokens;
          const pooled = this.tensorFor("vit pooled", tokens, 512, "e4");
          this.op("downsample", {
            count: tokens * 512,
            channels: 512,
            inWidth: d4.width,
            inHeight: d4.height,
            outWidth: d5.width,
            outHeight: d5.height,
            inF16: raw,
            outE4: pooled,
            label: "pool 30"
          });
          const vitState = this.tensorFor("vit state", tokens, 1024, "e4");
          this.gemm({
            input: pooled,
            weights: model.fp8Matrix(model.tensor(30, 4), 0, 512, 1024),
            output: vitState,
            rows: tokens,
            k: 512,
            n: 1024,
            label: "transition 30-31"
          });
          this.vit(vitState, tokens);
          const projected = this.tensorFor("decoder 512 projection", tokens, 512, "f16");
          this.gemm({
            input: vitState,
            weights: model.fp8Matrix(model.tensor(39), 0, 1024, 512),
            outputF16: projected,
            rows: tokens,
            k: 1024,
            n: 512,
            partition: 256,
            label: "transition 38-39"
          });
          const merged = this.tensorFor("decoder 512 merge", d4.rows, 512, "e4");
          this.op("upsample_residual", {
            count: d4.rows * 512,
            channels: 512,
            inWidth: d5.width,
            inHeight: d5.height,
            outWidth: d4.width,
            outHeight: d4.height,
            inF16: projected,
            skipE4: skip512,
            aux: model.auxVector(model.tensor(39), 1024 * 512, 512),
            outE4: merged,
            label: "block 39 merge"
          });
          this.capture("block-39", merged);
          let dst = merged;
          let dsc = this.tensorFor("decoder 512 state", d4.rows, 512, "e4");
          const dtemps = this.splitTemporaries("decoder 512", d4.rows);
          for (let block = 40; block <= 47; ++block) {
            this.splitBlock({
              block,
              width: d4.width,
              height: d4.height,
              temps: dtemps,
              state: dst,
              output: dsc,
              phase: this.phases.take(4)
            });
            [dst, dsc] = [dsc, dst];
            this.capture(`block-${block}`, dst);
          }
          stageInput = dst;
        }
        const decoderStages = [
          { low: d4, high: d3, channels: 256, first: 48, last: 55, levelIndex: 3, skip: skip256 },
          { low: d3, high: d2, channels: 128, first: 56, last: 61, levelIndex: 2, skip: skip128 },
          { low: d2, high: d1, channels: 64, first: 62, last: 65, levelIndex: 1, skip: skip64 },
          { low: d1, high: d0, channels: 32, first: 66, last: 69, levelIndex: 0, skip: skip32 }
        ];
        for (const stage of decoderStages) {
          const rows = stage.high.rows;
          const label = `decoder ${stage.channels}`;
          const transition = model.tensor(stage.first);
          const layout = upsampleFusedLayout(stage.channels * 2, stage.channels);
          if (transition.byteLength !== layout.endWithoutPadding + 16) {
            throw new Error(`unexpected upsample layout for block ${stage.first}`);
          }
          const projection = this.tensorFor(`${label} projection`, stage.low.rows, stage.channels, "f16");
          this.gemm({
            input: stageInput,
            weights: model.fp8Matrix(transition, layout.upsampleWeight, stage.channels * 2, stage.channels),
            outputF16: projection,
            rows: stage.low.rows,
            k: stage.channels * 2,
            n: stage.channels,
            label: `transition ->${stage.first}`
          });
          const merged = this.tensorFor(`${label} merge`, rows, stage.channels, "e4");
          const mergedRaw = stage.channels === 32 ? this.tensorFor(`${label} merge raw`, rows, 32, "f16") : null;
          this.op("upsample_residual", {
            count: rows * stage.channels,
            channels: stage.channels,
            inWidth: stage.low.width,
            inHeight: stage.low.height,
            outWidth: stage.high.width,
            outHeight: stage.high.height,
            dual: mergedRaw !== null,
            inF16: projection,
            skipE4: stage.skip,
            aux: model.auxVector(transition, layout.transitionScale, stage.channels),
            outE4: merged,
            outF16: mergedRaw,
            label: `block ${stage.first} merge`
          });
          let st = merged;
          let sc = this.tensorFor(`${label} state`, rows, stage.channels, "e4");
          const temps = this.temporaries(label, rows, stage.channels, layout);
          for (let block = stage.first; block <= stage.last; ++block) {
            this.block({
              block,
              channels: stage.channels,
              width: stage.high.width,
              height: stage.high.height,
              layout: block === stage.first ? layout : fusedLayout(stage.channels),
              tensor: model.tensor(block),
              temps,
              state: st,
              output: sc,
              ffnSkipOverride: block === stage.first ? mergedRaw : null,
              phase: this.phases.take(stage.levelIndex)
            });
            [st, sc] = [sc, st];
            this.capture(`block-${block}`, st);
          }
          stageInput = st;
        }
        {
          const tensor = model.tensor(70);
          const layout = postFusedLayout();
          if (tensor.byteLength !== layout.endWithoutPadding) throw new Error("unexpected block 70 layout");
          const mergedRaw = this.tensorFor("post merge raw", fullRows, 32, "f16");
          const merged = this.tensorFor("post merge", fullRows, 32, "e4");
          this.op("post_blend", {
            count: fullRows * 32,
            channels: 32,
            inWidth: d0.width,
            inHeight: d0.height,
            outWidth: g.fullWidth,
            outHeight: g.fullHeight,
            dual: true,
            auxA: 0,
            auxB: 32,
            inE4: stageInput,
            skipE4: block0,
            aux: model.auxPair(tensor, layout.inputScale, layout.adapterScale, 32),
            outE4: merged,
            outF16: mergedRaw,
            label: "post blend"
          });
          const blockRaw = this.tensorFor("post block raw", fullRows, 32, "f16");
          const postTemps = this.temporaries("post", fullRows, 32, layout);
          this.block({
            block: 70,
            channels: 32,
            width: g.fullWidth,
            height: g.fullHeight,
            layout,
            tensor,
            temps: postTemps,
            state: merged,
            output: null,
            outputF16: blockRaw,
            ffnSkipOverride: mergedRaw,
            phase: this.phases.take(6)
          });
          this.head = this.tensorFor("head", fullRows, 4, "f32");
          const { buffer, paddedN } = model.f16Matrix(tensor, layout.postWeights, 32, 4);
          this.gemmF16({
            input: blockRaw,
            weights: buffer,
            paddedN,
            outputF32: this.head,
            rows: fullRows,
            k: 32,
            n: 4,
            label: "head"
          });
        }
        return this;
      }
    };
  }
});

// ../src/network.js
var defaultBase, fetchText, Network;
var init_network = __esm({
  "../src/network.js"() {
    init_gpu();
    init_passes();
    init_model();
    init_graph();
    init_geometry();
    init_matmul();
    init_window();
    defaultBase = () => new URL("..", import.meta.url);
    fetchText = async (path, base) => {
      const response = await fetch(new URL(path, base));
      if (!response.ok) throw new Error(`cannot read ${path}`);
      return response.text();
    };
    Network = class _Network {
      /**
       * @param {object} options
       *   weights   - URL of the model directory (manifest.json plus model/stages/*)
       *   width,height - the valid image size; the padded field follows from it
       *   captureBoundaries - keep a copy of every block output, which the parity harness compares
       */
      static async create({
        weights,
        width,
        height,
        captureBoundaries = false,
        onProgress,
        extraShaders = [],
        before,
        after,
        shaderBase = null,
        device: existingDevice = null,
        model: existingModel = null
      } = {}) {
        const network = new _Network();
        let device = existingDevice;
        if (!device) {
          onProgress?.("requesting a device");
          const acquired = await requestDevice();
          device = acquired.device;
          network.adapterInfo = acquired.info;
        }
        network.device = device;
        requireWorkgroupStorage(device);
        network.geometry = geometryFromValid(width, height);
        const geometry = network.geometry;
        onProgress?.("compiling kernels");
        const base = shaderBase ?? defaultBase();
        const numerics = await fetchText("shaders/numerics.wgsl", base);
        const [gemmF16, vit, ops, preprocess] = await Promise.all([
          fetchText("shaders/gemm_f16.wgsl", base),
          fetchText("shaders/vit.wgsl", base),
          fetchText("shaders/ops.wgsl", base),
          fetchText("shaders/preprocess.wgsl", base)
        ]);
        const kernels = await Kernels.create(device);
        await kernels.add(numerics, gemmF16, "gemm_f16.wgsl", ["gemm_f16"]);
        await kernels.add(
          numerics,
          vit,
          "vit.wgsl",
          ["vit_normalize", "vit_attend"],
          { PADDED_TOKENS: geometry.paddedVitTokens }
        );
        await kernels.add(
          numerics,
          ops,
          "ops.wgsl",
          ["convert_f32_to_f16", "downsample", "upsample_residual", "post_blend"]
        );
        await kernels.add(numerics, preprocess, "preprocess.wgsl", ["preprocess"]);
        for (const { path, entryPoints } of extraShaders) {
          await kernels.add(numerics, await fetchText(path, base), path, entryPoints);
        }
        network.kernels = kernels;
        network.matmul = await Matmul.create(device);
        network.window = WindowAttention.create(device, numerics);
        if (existingModel) {
          network.model = existingModel;
          network.borrowedModel = true;
        } else {
          onProgress?.("loading weights");
          network.model = await new Model(device).load(weights, (loaded, total) => {
            onProgress?.(`loading weights ${(loaded / 1048576).toFixed(0)} / ${(total / 1048576).toFixed(0)} MiB`);
          });
        }
        onProgress?.("recording the graph");
        network.tensors = new Tensors(device);
        network.features = network.tensors.allocate("input features", geometry.fullRows, 16, "f32");
        network.graph = new Graph2({
          device,
          kernels,
          matmul: network.matmul,
          window: network.window,
          tensors: network.tensors,
          model: network.model,
          geometry
        }, { captureBoundaries });
        network.recorder = new Recorder(device, kernels, network.tensors);
        before?.(network);
        network.graph.record(network.recorder, network.features);
        after?.(network);
        await network.recorder.finish((done, count) => onProgress?.(`compiling kernels ${done}/${count}`));
        onProgress?.(`ready: ${network.recorder.dispatchCount} dispatches, ${(network.tensors.total / 1048576).toFixed(0)} MiB of activations, ${(network.model.bytesUploaded / 1048576).toFixed(0)} MiB of weights`);
        return network;
      }
      /**
       * Generate the input features from a recorded display proxy, the way a fixture that carries one wants. One
       * dispatch outside the recorded graph, so it runs and completes before the graph replays.
       */
      async featuresFromProxy(proxy, manifest) {
        const g = this.geometry;
        const [sourceWidth, sourceHeight] = [manifest.proxy.width, manifest.proxy.height];
        const conditioning = manifest.conditioning ?? {};
        const source = this.device.createBuffer({
          label: "fixture proxy",
          size: proxy.byteLength,
          usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });
        this.device.queue.writeBuffer(source, 0, proxy);
        const params = new ArrayBuffer(PARAMS_STRIDE);
        const words = new Uint32Array(params);
        const floats = new Float32Array(params);
        words[0] = g.fullWidth;
        words[1] = g.fullHeight;
        words[2] = g.validWidth;
        words[3] = g.validHeight;
        words[4] = sourceWidth;
        words[5] = sourceHeight;
        words[6] = manifest.seed ?? 0;
        floats[7] = manifest.autoMask ? 1 : -1;
        floats[8] = conditioning.localTone ?? 1;
        floats[9] = conditioning.localStructure ?? 1;
        floats[10] = conditioning.skinStructure ?? -1;
        floats[11] = conditioning.style ?? 0;
        const uniform = this.device.createBuffer({
          label: "preprocess parameters",
          size: PARAMS_STRIDE,
          usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.device.queue.writeBuffer(uniform, 0, params);
        const group = this.device.createBindGroup({
          layout: this.kernels.layout,
          entries: Array.from({ length: BINDING_COUNT }, (unused, binding) => ({
            binding,
            resource: binding === 0 ? { buffer: uniform, offset: 0, size: PARAMS_STRIDE } : binding === 1 ? { buffer: source } : binding === 5 ? { buffer: this.features.buffer } : { buffer: this.recorder.unused(binding) }
          }))
        });
        const encoder = this.device.createCommandEncoder({ label: "preprocess" });
        const pass = encoder.beginComputePass();
        pass.setPipeline(this.kernels.pipeline("preprocess"));
        pass.setBindGroup(0, group, [0]);
        pass.dispatchWorkgroups(Math.ceil(g.fullWidth / 8), Math.ceil(g.fullHeight / 8));
        pass.end();
        this.device.queue.submit([encoder.finish()]);
        await this.device.queue.onSubmittedWorkDone();
        source.destroy();
        uniform.destroy();
      }
      /** Replace the input features with `data` (f32 [fullRows][16]). */
      writeFeatures(data) {
        this.device.queue.writeBuffer(this.features.buffer, 0, data);
      }
      /**
       * One frame. Returns once the GPU has finished, so a caller can time it honestly.
       *
       * The first frame runs inside an error scope. A command buffer WebGPU refuses at finish() is dropped whole,
       * and the only symptom is that every output stays at whatever it was - which reads exactly like a network
       * that computes zeros. Once a frame has been accepted, the same command buffer is valid every time.
       */
      async run() {
        const checking = !this.validated;
        if (checking) this.device.pushErrorScope("validation");
        const encoder = this.device.createCommandEncoder({ label: "nr frame" });
        this.recorder.encode(encoder);
        this.device.queue.submit([encoder.finish()]);
        if (checking) {
          const error = await this.device.popErrorScope();
          if (error) throw new Error(`the frame was rejected: ${error.message}`);
          this.validated = true;
        }
        await this.device.queue.onSubmittedWorkDone();
      }
      /** The f32 RGBA head, [fullRows][4]. */
      async readHead() {
        const head = this.graph.head;
        return new Float32Array(await readBack(this.device, head.buffer, head.rows * 4 * 4));
      }
      /** Any intermediate tensor, by the label the graph allocated it under. For debugging a wrong result. */
      async readTensorByLabel(label) {
        for (const tensor of this.tensors.byKey.values()) {
          if (tensor.label !== label) continue;
          return { tensor, bytes: new Uint8Array(await readBack(this.device, tensor.buffer, tensor.validBytes)) };
        }
        throw new Error(`no tensor labelled "${label}"; have ` + [...this.tensors.byKey.values()].map((t) => t.label).join(", "));
      }
      async readBoundary(name) {
        const tensor = this.graph.boundaries.get(name);
        if (!tensor) throw new Error(`no captured boundary ${name}`);
        return new Uint8Array(await readBack(this.device, tensor.buffer, tensor.validBytes));
      }
      get boundaryNames() {
        return [...this.graph.boundaries.keys()];
      }
      destroy() {
        this.recorder.destroy();
        this.tensors.destroy();
        this.matmul.destroy();
        if (!this.borrowedModel) {
          this.model.destroy();
          this.device.destroy();
        }
      }
    };
  }
});

// src/backend/production-pipeline.js
var SLOTS, PARAM_WORDS, DlssNrProductionPipeline;
var init_production_pipeline = __esm({
  "src/backend/production-pipeline.js"() {
    init_network();
    init_gpu();
    init_nr_settings();
    SLOTS = 2;
    PARAM_WORDS = 18;
    DlssNrProductionPipeline = class _DlssNrProductionPipeline {
      static async create(inference, canvas, options = {}) {
        const pipeline = new _DlssNrProductionPipeline();
        pipeline.inference = inference;
        pipeline.device = inference.device;
        pipeline.canvas = canvas;
        pipeline.paperWhite = options.paperWhite ?? 1;
        pipeline.colorStrength = options.colorStrength ?? 1;
        pipeline.settings = normalizeNrSettings({});
        pipeline.busy = false;
        pipeline.network = null;
        pipeline.geometry = { validWidth: 0, validHeight: 0 };
        pipeline.frameIndex = 0;
        pipeline.context = canvas.getContext("webgpu");
        pipeline.canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        return pipeline;
      }
      /**
       * Build the graph for this field if it is not the one already standing. Recording the graph is asynchronous
       * where the rest of the pipeline is not, which is why the runtime awaits this.
       */
      async ensureGeometry(runtimeProfile) {
        const [width, height] = runtimeProfile.sourceDimensions;
        if (this.network && this.geometry.validWidth === width && this.geometry.validHeight === height) return;
        await this.build(runtimeProfile);
      }
      async build(runtimeProfile) {
        const [width, height] = runtimeProfile.sourceDimensions;
        this.releaseResources();
        const device = this.device;
        const resources = {};
        const network = await Network.create({
          weights: this.inference.model.weightsUrl,
          width,
          height,
          device,
          model: this.inference.model.weights,
          shaderBase: new URL("/", location.href),
          onProgress: this.inference.onProgress ?? void 0,
          extraShaders: [{ path: "shaders/frame.wgsl", entryPoints: ["input_features", "compose"] }],
          before: (net) => {
            this.blendScale = net.model.blendScale();
            resources.slots = Array.from({ length: SLOTS }, (unused, index) => ({
              color: device.createBuffer({
                label: `staged colour ${index}`,
                size: width * height * 8,
                usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
              }),
              motion: device.createBuffer({
                label: `staged velocity ${index}`,
                size: width * height * 4,
                usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
              })
            }));
            resources.scene = device.createBuffer({
              label: "rendered frame",
              size: width * height * 8,
              usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
            });
            resources.motion = device.createBuffer({
              label: "velocity",
              size: width * height * 4,
              usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
            });
            resources.history = [0, 1].map((index) => device.createBuffer({
              label: `history ${index}`,
              size: width * height * 8,
              usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
            }));
            resources.image = device.createBuffer({
              label: "presented image",
              size: align(width * 4, 256) * height,
              usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
            });
            const g = net.geometry;
            net.recorder.pass(
              "input_features",
              {
                1: resources.scene,
                2: resources.history[0],
                4: resources.motion,
                5: net.features.buffer
              },
              this.params(net, this.settings, false),
              [Math.ceil(g.fullWidth / 8), Math.ceil(g.fullHeight / 8)],
              "input features"
            );
            resources.featuresPass = net.recorder.passes.at(-1);
          },
          after: (net) => {
            net.recorder.pass("compose", {
              1: resources.scene,
              2: resources.history[0],
              3: net.graph.head.buffer,
              4: resources.motion,
              6: resources.history[1],
              7: resources.image
            }, this.params(net, this.settings, false), [Math.ceil(width / 8), Math.ceil(height / 8)], "compose");
            resources.composePass = net.recorder.passes.at(-1);
            net.recorder.copy(resources.history[1], resources.history[0], width * height * 8, "history swap");
          }
        });
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.configure({
          device,
          format: this.canvasFormat,
          alphaMode: "opaque",
          usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_DST
        });
        this.network = network;
        this.blendScale = network.model.blendScale();
        this.resources = resources;
        this.geometry = {
          validWidth: width,
          validHeight: height,
          fullWidth: network.geometry.fullWidth,
          fullHeight: network.geometry.fullHeight
        };
        this.historyValid = false;
      }
      params(network, settings, historyValid) {
        const buffer = new ArrayBuffer(PARAM_WORDS * 4);
        const words = new Uint32Array(buffer);
        const floats = new Float32Array(buffer);
        const g = network.geometry;
        words[0] = g.fullWidth;
        words[1] = g.fullHeight;
        words[2] = g.validWidth;
        words[3] = g.validHeight;
        words[4] = this.frameIndex & 65535;
        words[5] = historyValid ? 1 : 0;
        words[6] = settings.enabled === false ? 0 : 1;
        words[7] = align(g.validWidth * 4, 256) / 4;
        floats[8] = this.paperWhite;
        floats[9] = settings.style ?? 0;
        floats[10] = settings.localTone ?? 1;
        floats[11] = settings.localStructure ?? 1;
        floats[12] = settings.skinStructure ?? -1;
        floats[13] = settings.autoMask ? 1 : 0;
        floats[14] = this.blendScale;
        floats[15] = settings.intensity ?? 1;
        floats[16] = this.colorStrength;
        words[17] = 1;
        return words;
      }
      /** Stage a frame. Returns the milliseconds spent, which the runtime reports as upload time. */
      upload(slotIndex, rgba16, motion = null) {
        const slot = this.resources?.slots?.[slotIndex];
        const { validWidth, validHeight } = this.geometry;
        if (!slot) throw new Error("DLSS-NR production pipeline has no geometry yet");
        if (rgba16.byteLength !== validWidth * validHeight * 8) {
          throw new Error(`DLSS-NR production upload has ${rgba16.byteLength} bytes, expected ${validWidth * validHeight * 8}`);
        }
        const started = performance.now();
        this.device.queue.writeBuffer(slot.color, 0, rgba16);
        if (motion) {
          if (motion.byteLength !== validWidth * validHeight * 4) throw new Error("NR motion geometry mismatch");
          this.device.queue.writeBuffer(slot.motion, 0, motion);
        }
        return performance.now() - started;
      }
      async render(slotIndex, runtimeProfile, settings = this.settings, temporal = {}) {
        const controls2 = normalizeNrSettings(settings);
        if (this.busy) throw new Error("Production inference is already in flight");
        await this.ensureGeometry(runtimeProfile);
        this.busy = true;
        try {
          const { device, network, resources } = this;
          const historyValid = this.historyValid && !temporal.reset;
          const words = this.params(network, controls2, historyValid);
          device.queue.writeBuffer(network.recorder.paramsBuffer, resources.featuresPass.index * 256, words);
          device.queue.writeBuffer(network.recorder.paramsBuffer, resources.composePass.index * 256, words);
          const preprocessStart = performance.now();
          const slot = resources.slots[slotIndex];
          const stage = device.createCommandEncoder({ label: "stage" });
          stage.copyBufferToBuffer(slot.color, 0, resources.scene, 0, resources.scene.size);
          stage.copyBufferToBuffer(slot.motion, 0, resources.motion, 0, resources.motion.size);
          device.queue.submit([stage.finish()]);
          const preprocessMilliseconds = performance.now() - preprocessStart;
          const networkStart = performance.now();
          await network.run();
          const networkMilliseconds = performance.now() - networkStart;
          const presentStart = performance.now();
          const { validWidth: width, validHeight: height } = this.geometry;
          const present = device.createCommandEncoder({ label: "present" });
          present.copyBufferToTexture(
            { buffer: resources.image, bytesPerRow: align(width * 4, 256) },
            { texture: this.context.getCurrentTexture() },
            { width, height }
          );
          device.queue.submit([present.finish()]);
          const presentationMilliseconds = performance.now() - presentStart;
          this.historyValid = true;
          this.frameIndex += 1;
          return {
            neural: this.canvas,
            timings: { preprocessMilliseconds, networkMilliseconds, presentationMilliseconds }
          };
        } finally {
          this.busy = false;
        }
      }
      resetHistory() {
        this.historyValid = false;
      }
      /** The graph and every buffer sized by the field. */
      releaseResources() {
        for (const slot of this.resources?.slots ?? []) {
          slot.color.destroy();
          slot.motion.destroy();
        }
        for (const key2 of ["scene", "motion", "image"]) this.resources?.[key2]?.destroy();
        for (const buffer of this.resources?.history ?? []) buffer.destroy();
        this.network?.destroy();
        this.network = null;
        this.resources = null;
      }
      destroy() {
        this.releaseResources();
        this.geometry = { validWidth: 0, validHeight: 0 };
      }
    };
  }
});

// src/runtime/webgpu-bridge.js
var webgpu_bridge_exports = {};
function setStatus(message, error = false) {
  if (error) globalThis.dlssLoading?.fail(message);
  status.textContent = message;
  status.dataset.state = error ? "error" : "active";
  state.statusHistory.push({ time: performance.now(), message, error });
  if (state.statusHistory.length > 160) state.statusHistory.shift();
  if (error) console.error(`[dlss-webgpu] ${message}`);
  else console.info(`[dlss-webgpu:progress] ${message}`);
}
async function preservePresentedFrame() {
  if (!resizeHoldCanvas || !state.neuralVisible || !outputCanvas.width || !outputCanvas.height) return;
  try {
    const bitmap = await createImageBitmap(outputCanvas);
    if (!state.resizePending || state.compareSource) {
      bitmap.close();
      return;
    }
    resizeHoldCanvas.width = bitmap.width;
    resizeHoldCanvas.height = bitmap.height;
    const bitmapContext = resizeHoldCanvas.getContext("bitmaprenderer");
    if (bitmapContext) bitmapContext.transferFromImageBitmap(bitmap);
    else {
      resizeHoldCanvas.getContext("2d", { alpha: false })?.drawImage(bitmap, 0, 0);
      bitmap.close();
    }
    resizeHoldCanvas.classList.add("visible");
  } catch (error) {
    console.warn("[dlss-webgpu] unable to retain resize presentation", error);
  }
}
function releasePresentedFrame() {
  state.resizePending = false;
  state.resizeSettled = false;
  resizeHoldCanvas?.classList.remove("visible");
}
function profileFullDimensions(runtimeProfile) {
  return runtimeProfile.fullDimensions ?? [runtimeProfile.dimensions[0][0] * 2, runtimeProfile.dimensions[0][1] * 2];
}
function destroyGpuRuntime() {
  state.productionPipeline?.destroy();
  state.productionPipeline = null;
  state.srModel?.destroy();
  state.srModel = null;
  state.srInference = null;
  state.model?.destroy();
  state.model = null;
  state.inference = null;
  state.modelCapacity = null;
  state.startupGraphWarmed = false;
}
function describeFrame(frame) {
  return `${frame.renderWidth}\xD7${frame.renderHeight} \u2192 ${frame.outputWidth}\xD7${frame.outputHeight}`;
}
function buildHalfFloatTable() {
  const table = new Float32Array(65536);
  for (let bits = 0; bits < table.length; bits += 1) {
    const sign = bits & 32768 ? -1 : 1;
    const exponent = bits >>> 10 & 31;
    const mantissa = bits & 1023;
    if (exponent === 0) table[bits] = sign * mantissa * 2 ** -24;
    else if (exponent === 31) table[bits] = mantissa ? Number.NaN : sign * Number.POSITIVE_INFINITY;
    else table[bits] = sign * (1 + mantissa / 1024) * 2 ** (exponent - 15);
  }
  return table;
}
function truncateOutputF16(value) {
  outputHalfFloat[0] = value;
  const bits = outputHalfBits[0];
  const sign = bits >>> 16 & 32768;
  const exponent = bits >>> 23 & 255;
  const mantissa = bits & 8388607;
  let halfBits;
  if (exponent === 255) halfBits = sign | (mantissa ? 32256 : 31744);
  else {
    const halfExponent2 = exponent - 112;
    if (halfExponent2 >= 31) halfBits = sign | 31744;
    else if (halfExponent2 <= 0) halfBits = halfExponent2 < -10 ? sign : sign | (mantissa | 8388608) >>> 14 - halfExponent2;
    else halfBits = sign | halfExponent2 << 10 | mantissa >>> 13;
  }
  const halfExponent = halfBits >>> 10 & 31;
  const halfMantissa = halfBits & 1023;
  const halfSign = halfBits & 32768 ? -1 : 1;
  if (halfExponent === 0) return halfSign * halfMantissa * 2 ** -24;
  if (halfExponent === 31) return halfMantissa ? Number.NaN : halfSign * Number.POSITIVE_INFINITY;
  return halfSign * (1 + halfMantissa / 1024) * 2 ** (halfExponent - 15);
}
function clearGlErrors(gl) {
  for (let count = 0; count < 32 && gl.getError() !== gl.NO_ERROR; count += 1) {
  }
}
function readTarget(renderer, target, width, height, channels, ArrayType, format, type, label, destination = null) {
  const gl = renderer.getContext();
  const previousTarget = renderer.getRenderTarget();
  const previousFace = renderer.getActiveCubeFace?.() ?? 0;
  const previousLevel = renderer.getActiveMipmapLevel?.() ?? 0;
  const previousPackAlignment = gl.getParameter(gl.PACK_ALIGNMENT);
  const expectedValues = width * height * channels;
  const values = destination ?? new ArrayType(expectedValues);
  if (!(values instanceof ArrayType) || values.length !== expectedValues) {
    throw new Error(`${label} destination has ${values.length}/${expectedValues} values`);
  }
  try {
    renderer.setRenderTarget(target);
    if (typeof gl.readBuffer === "function") gl.readBuffer(gl.COLOR_ATTACHMENT0);
    gl.pixelStorei(gl.PACK_ALIGNMENT, 1);
    clearGlErrors(gl);
    gl.readPixels(0, 0, width, height, format, type, values);
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      throw new Error(`${label} readPixels failed with WebGL error 0x${error.toString(16)}`);
    }
  } finally {
    gl.pixelStorei(gl.PACK_ALIGNMENT, previousPackAlignment);
    renderer.setRenderTarget(previousTarget, previousFace, previousLevel);
  }
  return values;
}
function ensureCaptureSlots(width, height) {
  const geometry = `${width}x${height}`;
  if (state.captureGeometry === geometry) return;
  state.captureGeometry = geometry;
  state.nextCaptureSlot = 0;
  state.captureSlots = Array.from({ length: 2 }, (_, index) => ({
    index,
    color: new Uint16Array(width * height * 4),
    motion: new Uint16Array(width * height * 2)
  }));
}
function captureProductionColor(frame, preferredSlot = null) {
  const { renderer, renderWidth: width, renderHeight: height } = frame;
  if (width !== frame.outputWidth || height !== frame.outputHeight) {
    throw new Error(`DLSS-NR production requires 1:1 input/output; received ${describeFrame(frame)}`);
  }
  ensureCaptureSlots(width, height);
  const slotIndex = preferredSlot ?? state.nextCaptureSlot;
  state.nextCaptureSlot = (slotIndex + 1) % state.captureSlots.length;
  const slot = state.captureSlots[slotIndex];
  const gl = renderer.getContext();
  const started = performance.now();
  readTarget(
    renderer,
    frame.color,
    width,
    height,
    4,
    Uint16Array,
    gl.RGBA,
    gl.HALF_FLOAT,
    "RGBA16F color",
    slot.color
  );
  readTarget(
    renderer,
    frame.motion,
    width,
    height,
    2,
    Uint16Array,
    gl.RG,
    gl.HALF_FLOAT,
    "RG16F NR motion",
    slot.motion
  );
  return {
    frame,
    slotIndex,
    color: slot.color,
    motion: slot.motion,
    sourceFrame: state.frameCount,
    viewRevision: state.viewRevision,
    resizeRevision: state.resizeRevision,
    convergenceFrame: state.viewer.renderer.frameCount,
    renderWidth: width,
    renderHeight: height,
    outputWidth: frame.outputWidth,
    outputHeight: frame.outputHeight,
    reset: frame.reset,
    readbackMilliseconds: performance.now() - started,
    uploaded: false,
    uploadMilliseconds: 0
  };
}
function captureContract(frame) {
  const { renderer, renderWidth: rw, renderHeight: rh, outputWidth: ow, outputHeight: oh } = frame;
  const gl = renderer.getContext();
  const started = performance.now();
  const snapshot = {
    color: readTarget(
      renderer,
      frame.color,
      rw,
      rh,
      4,
      Uint16Array,
      gl.RGBA,
      gl.HALF_FLOAT,
      "RGBA16F color"
    ),
    depth: readTarget(
      renderer,
      frame.depth,
      rw,
      rh,
      1,
      Float32Array,
      gl.RED,
      gl.FLOAT,
      "R32F depth"
    ),
    motion: readTarget(
      renderer,
      frame.motion,
      rw,
      rh,
      2,
      Uint16Array,
      gl.RG,
      gl.HALF_FLOAT,
      "RG16F motion"
    ),
    reactive: readTarget(
      renderer,
      frame.reactive,
      rw,
      rh,
      1,
      Uint8Array,
      gl.RED,
      gl.UNSIGNED_BYTE,
      "R8 reactive mask"
    ),
    control: readTarget(
      renderer,
      frame.control,
      ow,
      oh,
      1,
      Uint8Array,
      gl.RED,
      gl.UNSIGNED_BYTE,
      "R8 control mask"
    ),
    renderWidth: rw,
    renderHeight: rh,
    outputWidth: ow,
    outputHeight: oh,
    jitter: { ...frame.jitter },
    previousJitter: { ...frame.previousJitter },
    resizeRevision: state.resizeRevision,
    reset: frame.reset,
    readbackMilliseconds: performance.now() - started
  };
  validateSnapshot(snapshot);
  return snapshot;
}
function sampledRange(values, decoder = (value) => value) {
  let minimum = Number.POSITIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;
  let finite = 0;
  const step = Math.max(1, Math.floor(values.length / 8192));
  for (let index = 0; index < values.length; index += step) {
    const value = decoder(values[index]);
    if (!Number.isFinite(value)) continue;
    minimum = Math.min(minimum, value);
    maximum = Math.max(maximum, value);
    finite += 1;
  }
  return { minimum, maximum, finite };
}
function sampledChannelRanges(values, channels, decoder = (value) => value) {
  return Array.from({ length: channels }, (_, channel) => {
    let minimum = Number.POSITIVE_INFINITY;
    let maximum = Number.NEGATIVE_INFINITY;
    let finite = 0;
    const pixels = Math.floor(values.length / channels);
    const step = Math.max(1, Math.floor(pixels / 4096));
    for (let pixel = 0; pixel < pixels; pixel += step) {
      const value = decoder(values[pixel * channels + channel]);
      if (!Number.isFinite(value)) continue;
      minimum = Math.min(minimum, value);
      maximum = Math.max(maximum, value);
      finite += 1;
    }
    return { minimum, maximum, finite };
  });
}
function publishDiagnostics(values) {
  state.diagnostics = { ...state.diagnostics ?? {}, ...values };
  status.dataset.diagnostics = JSON.stringify(state.diagnostics);
  console.info("[dlss-webgpu] numeric diagnostics", state.diagnostics);
}
function validateSnapshot(snapshot) {
  const color = sampledRange(snapshot.color, (value) => HALF_TO_FLOAT[value]);
  const depth = sampledRange(snapshot.depth);
  const motion = sampledRange(snapshot.motion, (value) => HALF_TO_FLOAT[value]);
  const reactive = sampledRange(snapshot.reactive);
  const control = sampledRange(snapshot.control);
  if (!color.finite || color.maximum - color.minimum < 1e-6) {
    throw new Error("The exact pre-tonemap color target is blank");
  }
  if (!depth.finite || !motion.finite || !reactive.finite || !control.finite) {
    throw new Error("One or more exact WebGI auxiliary targets could not be read");
  }
  snapshot.ranges = { color, depth, motion, reactive, control };
}
function decodeWebGiSceneLinear(snapshot) {
  const { renderWidth: width, renderHeight: height, outputWidth, outputHeight } = snapshot;
  if (width !== outputWidth || height !== outputHeight) {
    throw new Error(`DLSS-NR-only mode requires a 1:1 WebGI render; received ${width}\xD7${height} \u2192 ${outputWidth}\xD7${outputHeight}`);
  }
  const data = new Float32Array(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const sourceY = height - y - 1;
    for (let x = 0; x < width; x += 1) {
      const source = (sourceY * width + x) * 4;
      const target = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel += 1) {
        const value = HALF_TO_FLOAT[snapshot.color[source + channel]];
        data[target + channel] = Number.isFinite(value) ? Math.max(value, 0) : 0;
      }
      data[target + 3] = 1;
    }
  }
  return { data, width, height, implementation: "WebGI RGBA16F pre-tonemap" };
}
function srgbEncode(value) {
  const bounded = Math.max(0, Math.min(1, value));
  return bounded <= 31308e-7 ? 12.92 * bounded : 1.055 * bounded ** (1 / 2.4) - 0.055;
}
function srgbDecode(value) {
  const bounded = Math.max(0, Math.min(1, value));
  return bounded <= 0.04045 ? bounded / 12.92 : ((bounded + 0.055) / 1.055) ** 2.4;
}
function makeDisplayProxy(sceneLinear) {
  const proxy = new Float32Array(sceneLinear.data.length);
  const paper = Math.max(PAPER_WHITE_SCALE, 0.05);
  for (let index = 0; index < proxy.length; index += 4) {
    for (let channel = 0; channel < 3; channel += 1) {
      let value = Math.max(sceneLinear.data[index + channel], 0) / paper;
      if (value > 0.75) value = 0.75 + 0.25 * (1 - Math.exp(-5.77078 * (value - 0.75)));
      proxy[index + channel] = roundNativeF16(srgbEncode(value));
    }
    proxy[index + 3] = 1;
  }
  return { data: proxy, width: sceneLinear.width, height: sceneLinear.height };
}
function mat3Mul(matrix, value) {
  return [
    matrix[0] * value[0] + matrix[1] * value[1] + matrix[2] * value[2],
    matrix[3] * value[0] + matrix[4] * value[1] + matrix[5] * value[2],
    matrix[6] * value[0] + matrix[7] * value[1] + matrix[8] * value[2]
  ];
}
function luminance(color) {
  return color[0] * 0.212639 + color[1] * 0.715169 + color[2] * 0.072192;
}
function toOkLab(color) {
  const lms = mat3Mul([
    0.4122214708,
    0.5363325363,
    0.0514459929,
    0.2119034982,
    0.6806995451,
    0.1073969566,
    0.0883024619,
    0.2817188376,
    0.6299787005
  ], color).map((value) => Math.sign(value) * Math.abs(value) ** (1 / 3));
  return mat3Mul([
    0.2104542553,
    0.793617785,
    -0.0040720468,
    1.9779984951,
    -2.428592205,
    0.4505937099,
    0.0259040371,
    0.7827717662,
    -0.808675766
  ], lms);
}
function fromOkLab(lab) {
  const lms = mat3Mul([
    1,
    0.3963377774,
    0.2158037573,
    1,
    -0.1055613458,
    -0.0638541728,
    1,
    -0.0894841775,
    -1.291485548
  ], lab).map((value) => value * value * value);
  return mat3Mul([
    4.0767416621,
    -3.3077115913,
    0.2309699292,
    -1.2684380046,
    2.6097574011,
    -0.3413193965,
    -0.0041960863,
    -0.7034186147,
    1.707614701
  ], lms);
}
function clampAp1(color) {
  const ap1 = mat3Mul([
    0.613097,
    0.339523,
    0.047379,
    0.070194,
    0.916354,
    0.013452,
    0.020616,
    0.10957,
    0.869815
  ], color).map((value) => Math.max(0, value));
  return mat3Mul([
    1.705051,
    -0.621792,
    -0.083259,
    -0.130256,
    1.140805,
    -0.010548,
    -0.024003,
    -0.128969,
    1.152972
  ], ap1);
}
function hueOkLab(incorrect, correct) {
  const incorrectLab = toOkLab(incorrect);
  const correctLab = toOkLab(correct);
  const incorrectChroma = Math.hypot(incorrectLab[1], incorrectLab[2]);
  const correctChroma = Math.hypot(correctLab[1], correctLab[2]);
  const scale = correctChroma === 0 ? 1 : incorrectChroma / correctChroma;
  incorrectLab[1] = correctLab[1] * scale;
  incorrectLab[2] = correctLab[2] * scale;
  return clampAp1(fromOkLab(incorrectLab));
}
function upgradeToneMap(original, proxy, neural) {
  const originalY = luminance(original);
  const proxyY = luminance(proxy);
  const neuralY = luminance(neural);
  if (neuralY <= 1e-5) return original;
  const ratio = originalY < proxyY ? originalY / Math.max(proxyY, 1e-6) : (neuralY + Math.max(0, originalY - proxyY)) / neuralY;
  const scaled = hueOkLab(neural.map((value) => value * ratio), neural);
  return original.map((value, channel) => value + (scaled[channel] - value) * TRANSFER_STRENGTH);
}
function acesFit(value) {
  return (value * (value + 0.0245786) - 90537e-9) / (value * (0.983729 * value + 0.432951) + 0.238081);
}
function webGiDisplay(sceneLinear) {
  let color = mat3Mul([
    0.59719,
    0.35458,
    0.04823,
    0.076,
    0.90834,
    0.01566,
    0.0284,
    0.13383,
    0.83777
  ], sceneLinear.map((value) => value / 0.6)).map(acesFit);
  color = mat3Mul([
    1.60475,
    -0.53108,
    -0.07367,
    -0.10208,
    1.10813,
    -605e-5,
    -327e-5,
    -0.07276,
    1.07602
  ], color).map((value) => Math.max(0, Math.min(1, value)));
  return color.map(srgbEncode);
}
function composeOutput(sceneLinear, proxy, neuralResult, controlMask) {
  const { width, height } = sceneLinear;
  const bytes = new Uint8ClampedArray(width * height * 4);
  const { features, featureChannels, width: featureWidth } = neuralResult;
  const paper = Math.max(PAPER_WHITE_SCALE, 0.05);
  for (let y = 0; y < height; y += 1) {
    const controlY = height - y - 1;
    for (let x = 0; x < width; x += 1) {
      const pixel = y * width + x;
      const rgba = pixel * 4;
      const feature = (y * featureWidth + x) * featureChannels;
      const preserve = USE_EXTERNAL_CONTROL_MASK ? controlMask[controlY * width + x] / 255 : 0;
      const original = [
        Math.max(sceneLinear.data[rgba], 0) / paper,
        Math.max(sceneLinear.data[rgba + 1], 0) / paper,
        Math.max(sceneLinear.data[rgba + 2], 0) / paper
      ];
      const proxyLinear = [0, 1, 2].map((channel) => srgbDecode(proxy.data[rgba + channel]));
      const neuralLinear = [0, 1, 2].map((channel) => {
        const source = roundNativeF16(proxy.data[rgba + channel]);
        const centered = Math.fround(Math.fround(source * 0.125) - 0.0625);
        const head = features[feature + channel];
        const residual = Number.isFinite(head) ? Math.fround(head * 0.03125) : 0;
        const mixed = Math.fround(centered + residual);
        const combined = Math.max(0, Math.min(
          1,
          Math.fround(Math.fround(mixed * 8) + 0.5)
        ));
        const published = truncateOutputF16(combined);
        const controlled = published + (proxy.data[rgba + channel] - published) * preserve;
        return srgbDecode(controlled);
      });
      const upgraded = upgradeToneMap(original, proxyLinear, neuralLinear);
      const originalY = luminance(original);
      const upgradedY = luminance(upgraded);
      const ratio = originalY === 0 ? 1 : Math.max(0, Math.min(4, upgradedY / originalY));
      const result = upgraded.map((value, channel) => {
        const luminanceOnly = original[channel] * ratio;
        return (luminanceOnly + (value - luminanceOnly) * COLOR_STRENGTH) * paper;
      });
      const display = webGiDisplay(result);
      bytes[rgba] = Math.floor(display[0] * 255 + 0.5);
      bytes[rgba + 1] = Math.floor(display[1] * 255 + 0.5);
      bytes[rgba + 2] = Math.floor(display[2] * 255 + 0.5);
      bytes[rgba + 3] = 255;
    }
  }
  return new ImageData(bytes, width, height);
}
function modelProgress(message, error = false, download = null) {
  setStatus(`DLSS-NR WebGPU \xB7 ${message}`, error);
  if (!state.resizePending || !state.result) {
    globalThis.dlssLoading?.runtime(message, error, download);
  }
}
async function ensureInference(runtimeProfile) {
  const [fullWidth, fullHeight] = profileFullDimensions(runtimeProfile);
  if (state.model && (fullWidth > state.modelCapacity.width || fullHeight > state.modelCapacity.height)) {
    destroyGpuRuntime();
  }
  if (!state.model) {
    state.model = await DlssNrWebGpuModel.create({
      production: PRODUCTION_RUNTIME,
      activationWidth: fullWidth,
      activationHeight: fullHeight,
      activationCapacityScale: DEVICE_CAPACITY_HEADROOM,
      onProgress: modelProgress
    });
    state.modelCapacity = state.model.activationCapacity;
  }
  const [vitWidth, vitHeight] = runtimeProfile.dimensions.at(-1);
  const vitTokens = vitWidth * vitHeight;
  state.inference ??= await DlssNrBrowserInference.create(
    state.model,
    modelProgress,
    { maxVitTokens: vitTokens, production: PRODUCTION_RUNTIME }
  );
  state.inference.hierarchy.storageBindingLimit = state.model.storageBindingSizeFor(fullWidth, fullHeight);
  if (PRODUCTION_RUNTIME) await state.inference.ensureProductionTokens(vitTokens);
  return state.inference;
}
async function ensureProductionPipeline(runtimeProfile) {
  const inference = await ensureInference(runtimeProfile);
  state.productionPipeline ??= await DlssNrProductionPipeline.create(
    inference,
    outputCanvas,
    {
      paperWhite: PAPER_WHITE_SCALE,
      colorStrength: COLOR_STRENGTH
    }
  );
  await state.productionPipeline.ensureGeometry(runtimeProfile);
  return state.productionPipeline;
}
async function ensureSrInference() {
  if (!state.model) throw new Error("DLSS-NR WebGPU device must be initialized before DLSS-SR");
  if (state.srModel && state.srModel.device !== state.model.device) {
    state.srModel.destroy();
    state.srModel = null;
    state.srInference = null;
  }
  state.srModel ??= await DlssSrWebGpuModel.create(state.model.device, {
    onProgress: (message, error = false) => setStatus(message, error)
  });
  state.srInference ??= await DlssSrBrowserInference.create(
    state.srModel,
    (message, error = false) => setStatus(message, error)
  );
  return state.srInference;
}
async function captureNativeReference(srInference) {
  const enc0Tap = CAPTURE_NATIVE_ENC0_DOWN;
  const inputUrl = enc0Tap ? "/native-sr-enc0-tap/native-sr-input16.bin" : "/native-sr-contract/native-sr-input16.bin";
  const laterBoundaries = [
    "enc2-mixed",
    "enc2-attn",
    "enc2-mlp-hidden",
    "enc2-skip",
    "enc2-down",
    "enc3-mixed",
    "enc3-attn",
    "enc3-mlp-hidden",
    "enc3-skip",
    "enc3-down",
    "enc4-mixed",
    "enc4-attn",
    "enc4-mlp-hidden",
    "enc4-skip",
    "enc4-down",
    "dec5-mixed",
    "dec5-attn",
    "dec5-mlp-hidden",
    "dec5-output",
    "dec4-output",
    "dec3-output",
    "dec2-output",
    "dec1-output",
    "dec0-output"
  ];
  const boundaries = enc0Tap ? [
    "embedding",
    "enc0-values",
    "enc0-mixed",
    "enc0-attn",
    "enc0-mlp-hidden",
    "enc0-skip",
    "enc0-down",
    "enc1-mixed",
    "enc1-attn",
    "enc1-mlp-hidden",
    "enc1-skip",
    "enc1-down",
    ...laterBoundaries
  ] : [
    "enc1-mixed",
    "enc1-attn",
    "enc1-mlp-hidden",
    "enc1-skip",
    "enc1-down",
    ...laterBoundaries
  ];
  setStatus(`DLSS-SR diagnostic \xB7 loading immutable ${enc0Tap ? "enc0 tap" : "head"} input16`);
  const response = await fetch(inputUrl, { cache: "no-store" });
  if (!response.ok) throw new Error(`Native SR input16 load failed: HTTP ${response.status}`);
  const packed = new Uint16Array(await response.arrayBuffer());
  if (packed.length !== 256 * 256 * 16) {
    throw new Error(`Native SR input16 has ${packed.length} halves, expected ${256 * 256 * 16}`);
  }
  const features = new Float32Array(packed.length);
  for (let index = 0; index < packed.length; index += 1) features[index] = HALF_TO_FLOAT[packed[index]];
  setStatus("DLSS-SR diagnostic \xB7 evaluating fixed 512 reference through WebGPU");
  const result = await srInference.run({
    features,
    sceneColor: null,
    renderWidth: 512,
    renderHeight: 512,
    networkWidth: 256,
    networkHeight: 256,
    outputWidth: 1024,
    outputHeight: 1024,
    exposure: 1,
    captureHead: !enc0Tap,
    headOnly: true,
    captureBoundaries: boundaries
  });
  const uploadCapture = async (name, values) => fetch(
    `/api/sr-capture?name=${name}&set=${SR_CAPTURE_SET}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: values
    }
  );
  let savedBytes = 0;
  if (!enc0Tap) {
    if (!result.head || result.head.length !== 256 * 256 * 40) {
      throw new Error(`WebGPU SR head capture has ${result.head?.length ?? 0} values`);
    }
    setStatus("DLSS-SR diagnostic \xB7 saving 40-lane browser head");
    const upload = await uploadCapture("head40", result.head);
    if (!upload.ok) throw new Error(`SR head capture upload failed: ${await upload.text()}`);
    savedBytes = (await upload.json()).bytes;
  }
  for (const [name, values] of Object.entries(result.boundaries)) {
    const boundaryUpload = await uploadCapture(name, values);
    if (!boundaryUpload.ok) {
      throw new Error(`SR ${name} capture upload failed: ${await boundaryUpload.text()}`);
    }
  }
  publishDiagnostics({
    stage: enc0Tap ? "sr-reference-enc0-down" : "sr-reference-head40",
    milliseconds: result.milliseconds,
    values: enc0Tap ? result.boundaries["enc0-down"]?.length : result.head.length,
    bytes: enc0Tap ? result.boundaries["enc0-down"]?.byteLength : savedBytes
  });
  setStatus(`DLSS-SR diagnostic ${enc0Tap ? "enc0-down" : "head"} saved \xB7 ${result.milliseconds.toFixed(0)} ms`);
}
async function captureNativeDecoder5Input(srInference) {
  setStatus("DLSS-SR diagnostic \xB7 loading exact native encoder-4-down input");
  const response = await fetch("/native-sr-full-remap/native-sr-enc4-down.bin", {
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Native encoder-4-down load failed: HTTP ${response.status}`);
  const packed = new Uint16Array(await response.arrayBuffer());
  const expected = 8 * 8 * 160;
  if (packed.length !== expected) {
    throw new Error(`Native encoder-4-down has ${packed.length} halves, expected ${expected}`);
  }
  const input = new Float32Array(expected);
  for (let index = 0; index < expected; index += 1) input[index] = HALF_TO_FLOAT[packed[index]];
  setStatus("DLSS-SR diagnostic \xB7 replaying decoder-5 from exact native input");
  const result = await srInference.runBlockDiagnostic({
    stageId: "dec_5",
    input,
    width: 8,
    height: 8,
    precision: DEC5_PRECISION
  });
  const uploads = [
    [`dec5-native-input-${DEC5_PRECISION}-qkv`, result.qkv],
    [`dec5-native-input-${DEC5_PRECISION}-mixed`, result.mixed],
    [`dec5-native-input-${DEC5_PRECISION}-attn`, result.attention],
    [`dec5-native-input-${DEC5_PRECISION}-output`, result.output]
  ];
  for (const [name, values] of uploads) {
    const upload = await fetch(`/api/sr-capture?name=${name}&set=${SR_CAPTURE_SET}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: values
    });
    if (!upload.ok) throw new Error(`SR ${name} capture upload failed: ${await upload.text()}`);
  }
  publishDiagnostics({
    stage: `sr-reference-dec5-native-input-${DEC5_PRECISION}`,
    milliseconds: result.milliseconds,
    values: result.output.length,
    bytes: result.output.byteLength
  });
  setStatus(`DLSS-SR decoder-5 ${DEC5_PRECISION} native-input replay saved \xB7 ${result.milliseconds.toFixed(0)} ms`);
}
async function captureNativeDecoder4Input(srInference) {
  setStatus("DLSS-SR diagnostic \xB7 loading exact native decoder-4 block input");
  const response = await fetch("/native-sr-dec4-up-tap/native-sr-dec4-output.bin", {
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Native decoder-4 input load failed: HTTP ${response.status}`);
  const packed = new Uint16Array(await response.arrayBuffer());
  const expected = 16 * 16 * 128;
  if (packed.length !== expected) {
    throw new Error(`Native decoder-4 input has ${packed.length} halves, expected ${expected}`);
  }
  const input = new Float32Array(expected);
  for (let index = 0; index < expected; index += 1) input[index] = HALF_TO_FLOAT[packed[index]];
  setStatus("DLSS-SR diagnostic \xB7 replaying decoder-4 from exact native input");
  const result = await srInference.runBlockDiagnostic({
    stageId: "dec_4",
    input,
    width: 16,
    height: 16,
    precision: DEC4_PRECISION
  });
  const uploads = [
    [`dec4-native-input-${DEC4_PRECISION}-qkv`, result.qkv],
    [`dec4-native-input-${DEC4_PRECISION}-mixed`, result.mixed],
    [`dec4-native-input-${DEC4_PRECISION}-attn`, result.attention],
    [`dec4-native-input-${DEC4_PRECISION}-mlp-hidden`, result.mlpHidden],
    [`dec4-native-input-${DEC4_PRECISION}-output`, result.output]
  ];
  for (const [name, values] of uploads) {
    const upload = await fetch(`/api/sr-capture?name=${name}&set=${SR_CAPTURE_SET}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: values
    });
    if (!upload.ok) throw new Error(`SR ${name} capture upload failed: ${await upload.text()}`);
  }
  publishDiagnostics({
    stage: `sr-reference-dec4-native-input-${DEC4_PRECISION}`,
    milliseconds: result.milliseconds,
    values: result.output.length,
    bytes: result.output.byteLength
  });
  setStatus(`DLSS-SR decoder-4 ${DEC4_PRECISION} native-input replay saved \xB7 ${result.milliseconds.toFixed(0)} ms`);
}
async function captureNativeDecoder0Input(srInference) {
  setStatus("DLSS-SR diagnostic \xB7 loading exact native decoder-1 and encoder-0 inputs");
  const [decoderResponse, skipResponse] = await Promise.all([
    fetch("/native-sr-full-remap/native-sr-dec1-output.bin", { cache: "no-store" }),
    fetch("/native-sr-full-remap/native-sr-enc0-skip.bin", { cache: "no-store" })
  ]);
  if (!decoderResponse.ok) {
    throw new Error(`Native decoder-1 output load failed: HTTP ${decoderResponse.status}`);
  }
  if (!skipResponse.ok) {
    throw new Error(`Native encoder-0 skip load failed: HTTP ${skipResponse.status}`);
  }
  const decoderPacked = new Uint16Array(await decoderResponse.arrayBuffer());
  const skipPacked = new Uint16Array(await skipResponse.arrayBuffer());
  const expectedDecoder = 128 * 128 * 64;
  const expectedSkip = 256 * 256 * 32;
  if (decoderPacked.length !== expectedDecoder || skipPacked.length !== expectedSkip) {
    throw new Error(`Native decoder-0 inputs have ${decoderPacked.length}/${skipPacked.length} halves, expected ${expectedDecoder}/${expectedSkip}`);
  }
  const input = new Float32Array(expectedDecoder);
  const skip = new Float32Array(expectedSkip);
  for (let index = 0; index < input.length; index += 1) input[index] = HALF_TO_FLOAT[decoderPacked[index]];
  for (let index = 0; index < skip.length; index += 1) skip[index] = HALF_TO_FLOAT[skipPacked[index]];
  const variants = DEC0_PRECISION_SWEEP ? [
    "f32",
    "norm-f16",
    "qkv-f16",
    "projection-f16",
    "mlp-f16",
    "front-f16",
    "block-f16",
    "head-f16",
    "all-f16"
  ] : [DEC0_PRECISION];
  let totalMilliseconds = 0;
  let lastResult = null;
  for (const precision of variants) {
    setStatus(`DLSS-SR diagnostic \xB7 decoder-0 exact-input ${precision}`);
    const captureIntermediate = !DEC0_PRECISION_SWEEP;
    const result = await srInference.runDecoderDiagnostic({
      stageId: "dec_0",
      input,
      skip,
      inputWidth: 128,
      inputHeight: 128,
      outputWidth: 256,
      outputHeight: 256,
      precision,
      captureIntermediate
    });
    totalMilliseconds += result.milliseconds;
    lastResult = result;
    const uploads = DEC0_PRECISION_SWEEP ? [[`dec0-native-input-${precision}-head40`, result.head]] : [
      ["dec0-native-input-upsample", result.upsample],
      ["dec0-native-input-padded", result.padded],
      ["dec0-native-input-normalized", result.normalized],
      ["dec0-native-input-values", result.values],
      ["dec0-native-input-mixed", result.mixed],
      ["dec0-native-input-attention", result.attention],
      ["dec0-native-input-normalized2", result.normalized2],
      ["dec0-native-input-mlp-hidden", result.mlpHidden],
      ["dec0-native-input-output", result.output],
      ["dec0-native-input-head40", result.head]
    ];
    for (const [name, values] of uploads) {
      const upload = await fetch(`/api/sr-capture?name=${name}&set=${SR_CAPTURE_SET}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: values
      });
      if (!upload.ok) throw new Error(`SR ${name} capture upload failed: ${await upload.text()}`);
    }
  }
  publishDiagnostics({
    stage: DEC0_PRECISION_SWEEP ? "sr-reference-dec0-precision-sweep" : "sr-reference-dec0-native-input",
    milliseconds: totalMilliseconds,
    variants,
    values: lastResult.head.length,
    bytes: lastResult.head.byteLength
  });
  setStatus(`DLSS-SR decoder-0 ${DEC0_PRECISION_SWEEP ? "precision sweep" : "native-input replay"} saved \xB7 ${totalMilliseconds.toFixed(0)} ms`);
}
function setNeuralVisible(visible) {
  state.neuralVisible = state.settings.enabled && state.neuralReady && visible;
  outputCanvas.classList.toggle("visible", state.neuralVisible);
  demoUi.setPresented(state.neuralVisible);
  if (state.viewer) state.viewer.renderEnabled = state.live || !state.neuralVisible;
  document.querySelector("#nrCompare")?.setAttribute("aria-pressed", String(state.neuralVisible));
  if (!state.neuralReady) return;
  const performanceSummary = state.result?.timings ? ` \xB7 read ${state.result.timings.readbackMilliseconds.toFixed(0)} \xB7 prep ${formatMilliseconds(state.result.timings.uploadPreprocessMilliseconds)} \xB7 net ${formatMilliseconds(state.result.timings.networkMilliseconds)} \xB7 present ${formatMilliseconds(state.result.timings.presentationMilliseconds)} ms` : "";
  setStatus(state.neuralVisible ? `DLSS-NR WebGPU \xB7 ${state.result.outputWidth}\xD7${state.result.outputHeight}${performanceSummary} \xB7 F6 source` : `WebGI source \xB7 ${describeFrame(state.frame)} \xB7 F6 neural`);
  status.dataset.state = "ready";
}
async function runProductionFrame(frame, queuedCapture = null) {
  const settings = { ...state.settings };
  const revision = state.settingsRevision;
  setStatus(`Reading WebGI RGBA16F color \xB7 ${describeFrame(frame)}`);
  const snapshot = queuedCapture ?? captureProductionColor(frame);
  state.snapshot = snapshot;
  state.activeSlot = snapshot.slotIndex;
  if (state.viewer) state.viewer.renderEnabled = state.live;
  const runtimeProfile = createRuntimeProfile(snapshot.renderWidth, snapshot.renderHeight);
  setStatus(`Color captured in ${snapshot.readbackMilliseconds.toFixed(0)} ms \xB7 preparing persistent WebGPU graph`);
  const pipeline = await ensureProductionPipeline(runtimeProfile);
  if (!snapshot.uploaded) {
    snapshot.uploadMilliseconds = pipeline.upload(snapshot.slotIndex, snapshot.color, snapshot.motion);
    snapshot.uploaded = true;
  }
  const reset = snapshot.reset || snapshot.sourceFrame !== state.lastNrSourceFrame + 1;
  globalThis.dlssLoading?.stage("Rendering first DLSS frame", "Neural model ready \xB7 preparing your view");
  const { neural, timings: gpuTimings } = await pipeline.render(snapshot.slotIndex, runtimeProfile, settings, { reset });
  state.lastNrSourceFrame = snapshot.sourceFrame;
  const timings = {
    readbackMilliseconds: snapshot.readbackMilliseconds,
    uploadPreprocessMilliseconds: gpuTimings ? snapshot.uploadMilliseconds + gpuTimings.preprocessMilliseconds : null,
    networkMilliseconds: gpuTimings?.networkMilliseconds ?? null,
    presentationMilliseconds: gpuTimings?.presentationMilliseconds ?? null
  };
  if (!state.startupGraphWarmed) {
    const retainedDevice = state.model.device;
    const retainedModel = state.model;
    const retainedInference = state.inference;
    state.startupGraphWarmed = true;
    state.startupWarmupFrames++;
    state.productionPipeline.destroy();
    state.productionPipeline = null;
    state.inference.resetProductionGraph();
    state.lastNrSourceFrame = null;
    state.snapshot = null;
    state.neuralReady = false;
    state.result = null;
    state.rerunRequested = true;
    if (state.viewer) state.viewer.renderEnabled = true;
    setStatus("Cold WebGPU graph warmed \xB7 rebuilding stable presentation graph");
    globalThis.dlssLoading?.stage(
      "Preparing first frame",
      "WebGPU kernels ready \xB7 validating the presentation graph"
    );
    console.info("[dlss-webgpu] discarded cold startup plan", {
      dimensions: [snapshot.outputWidth, snapshot.outputHeight],
      retainedDevice: state.model.device === retainedDevice,
      retainedModel: state.model === retainedModel,
      retainedInference: state.inference === retainedInference,
      warmupFrames: state.startupWarmupFrames
    });
    return;
  }
  state.result = {
    snapshot,
    sr: null,
    neural,
    outputWidth: snapshot.outputWidth,
    outputHeight: snapshot.outputHeight,
    runtimeProfile,
    pipeline: "dlss-nr-production-gpu",
    maskMode: settings.autoMask ? "automatic" : "unmasked",
    settings,
    settingsRevision: revision,
    timings,
    timingSource: gpuTimings?.source ?? "GPU timestamps unavailable"
  };
  const currentResize = !state.resizePending || snapshot.resizeRevision === state.resizeRevision;
  if (currentResize) {
    state.neuralReady = revision === state.settingsRevision && (state.live || snapshot.viewRevision === state.viewRevision);
  }
  if (currentResize && state.neuralReady) {
    demoUi.frameComplete(timings, snapshot.outputWidth, snapshot.outputHeight);
  }
  globalThis.__dlssWebGpuExact = state;
  if (currentResize) {
    setNeuralVisible(!state.compareSource);
    if (state.resizePending && state.neuralReady) releasePresentedFrame();
  } else {
    state.rerunRequested = true;
  }
  console.info("[dlss-webgpu] production frame complete", {
    dimensions: [snapshot.outputWidth, snapshot.outputHeight],
    timings,
    resources: neural.resources,
    commandSubmissions: 1,
    completionWaits: 1,
    inputResources: ["RGBA16F color"],
    maskMode: state.result.maskMode,
    settings
  });
}
async function runCapturedFrame(frame, queuedCapture = null) {
  if (!state.settings.enabled) return;
  if (state.running) {
    state.rerunRequested = true;
    return;
  }
  state.running = true;
  state.captureRequested = false;
  state.rerunRequested = false;
  if (!state.live && !state.resizePending) setNeuralVisible(false);
  try {
    if (PRODUCTION_RUNTIME) {
      await runProductionFrame(frame, queuedCapture);
      return;
    }
    setStatus(`Reading exact WebGI bridge \xB7 ${describeFrame(frame)} \xB7 five resources`);
    const snapshot = captureContract(frame);
    state.snapshot = snapshot;
    console.info("[dlss-webgpu] captured bridge ranges", snapshot.ranges);
    if (state.viewer) state.viewer.renderEnabled = false;
    const srDiagnostic = CAPTURE_NATIVE_DEC0_INPUT || CAPTURE_NATIVE_DEC4_INPUT || CAPTURE_NATIVE_DEC5_INPUT || CAPTURE_NATIVE_REFERENCE_HEAD || CAPTURE_NATIVE_ENC0_DOWN;
    setStatus(`Bridge captured in ${snapshot.readbackMilliseconds.toFixed(0)} ms \xB7 preparing ${srDiagnostic ? "SR diagnostic" : "native-resolution NR input"}`);
    const runtimeProfile = createRuntimeProfile(
      srDiagnostic ? snapshot.outputWidth : snapshot.renderWidth,
      srDiagnostic ? snapshot.outputHeight : snapshot.renderHeight
    );
    const inference = await ensureInference(runtimeProfile);
    if (srDiagnostic) {
      const srInference = await ensureSrInference();
      if (CAPTURE_NATIVE_DEC0_INPUT) await captureNativeDecoder0Input(srInference);
      else if (CAPTURE_NATIVE_DEC4_INPUT) await captureNativeDecoder4Input(srInference);
      else if (CAPTURE_NATIVE_DEC5_INPUT) await captureNativeDecoder5Input(srInference);
      else await captureNativeReference(srInference);
      if (state.viewer) state.viewer.renderEnabled = true;
      return;
    }
    const sceneLinear = decodeWebGiSceneLinear(snapshot);
    const bridgeColorChannels = sampledChannelRanges(
      snapshot.color,
      4,
      (value) => HALF_TO_FLOAT[value]
    );
    const sceneRange = sampledRange(sceneLinear.data);
    const sceneInputChannels = sampledChannelRanges(sceneLinear.data, 4);
    publishDiagnostics({
      stage: "nr-input-source",
      bridgeColorChannels,
      sceneRange,
      sceneInputChannels
    });
    if (!sceneRange.finite || !Number.isFinite(sceneRange.minimum) || !Number.isFinite(sceneRange.maximum)) {
      throw new Error("WebGI produced no finite pre-tonemap color samples");
    }
    const proxy = makeDisplayProxy(sceneLinear);
    const proxyRange = sampledRange(proxy.data);
    publishDiagnostics({ stage: "nr-input", sceneRange, proxyRange });
    if (CAPTURE_NR_REFERENCE) {
      const upload = await fetch(`/api/nr-capture?name=proxy&width=${proxy.width}&height=${proxy.height}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: proxy.data
      });
      if (!upload.ok) throw new Error(`NR proxy capture failed: ${await upload.text()}`);
    }
    setStatus(`DLSS-NR only \xB7 automatic mask \xB7 ${sceneLinear.width}\xD7${sceneLinear.height}`);
    const neural = await inference.run(proxy, {
      profile: "runtime",
      runtimeProfile,
      autoMask: !USE_EXTERNAL_CONTROL_MASK
    });
    const neuralRange = sampledRange(neural.features);
    if (CAPTURE_NR_REFERENCE) {
      const upload = await fetch(`/api/nr-capture?name=head&width=${neural.width}&height=${neural.height}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: neural.features
      });
      if (!upload.ok) throw new Error(`NR head capture failed: ${await upload.text()}`);
    }
    publishDiagnostics({
      stage: "nr-output",
      sceneRange,
      proxyRange,
      neuralRange
    });
    setStatus("DLSS-NR complete \xB7 automatic mask \xB7 applying WebGI display transform");
    const composed = composeOutput(sceneLinear, proxy, neural, snapshot.control);
    outputCanvas.width = sceneLinear.width;
    outputCanvas.height = sceneLinear.height;
    outputContext.putImageData(composed, 0, 0);
    const composedRange = sampledRange(composed.data);
    publishDiagnostics({
      stage: "composed",
      sceneRange,
      proxyRange,
      neuralRange,
      composedRange
    });
    state.result = {
      snapshot,
      sceneLinear,
      proxy,
      sr: null,
      neural,
      composed,
      outputWidth: sceneLinear.width,
      outputHeight: sceneLinear.height,
      runtimeProfile,
      pipeline: "dlss-nr-only",
      maskMode: USE_EXTERNAL_CONTROL_MASK ? "external-control" : "automatic",
      unsupported: [
        "DLSS-SR intentionally disconnected pending parity closure",
        "feature-18 depth/motion temporal preprocessing"
      ]
    };
    state.neuralReady = true;
    globalThis.__dlssWebGpuExact = state;
    setNeuralVisible(true);
    if (state.resizePending && snapshot.resizeRevision === state.resizeRevision) releasePresentedFrame();
    console.info("[dlss-webgpu] feature-18 frame complete", {
      dimensions: [sceneLinear.width, sceneLinear.height],
      graphMilliseconds: neural.milliseconds,
      pipeline: state.result.pipeline,
      readbackMilliseconds: snapshot.readbackMilliseconds,
      ranges: snapshot.ranges,
      runtimeProfile,
      maskMode: state.result.maskMode,
      contractGap: state.result.unsupported
    });
  } catch (error) {
    console.error(error);
    setStatus(error.stack || error.message || String(error), true);
    state.live = false;
    state.pendingProductionFrame = null;
    state.rerunRequested = false;
    state.captureRequested = false;
    document.querySelector("#nrLive")?.setAttribute("aria-pressed", "false");
    if (state.viewer) state.viewer.renderEnabled = true;
  } finally {
    state.running = false;
    state.activeSlot = null;
    const pending = state.pendingProductionFrame;
    state.pendingProductionFrame = null;
    if (pending) void runCapturedFrame(pending.frame, pending);
    else if (state.rerunRequested) requestNeuralFrame();
  }
}
function consumeFrame(frame) {
  if (!globalThis.dlssSceneReady) return;
  state.frame = frame;
  state.frameCount += 1;
  if (state.frameCount === 1) {
    setStatus(PRODUCTION_RUNTIME ? `WebGPU production connected \xB7 ${describeFrame(frame)} \xB7 color and NR motion` : `WebGPU diagnostic connected \xB7 ${describeFrame(frame)} \xB7 color/depth/MV/reactive/control`);
    console.info("[dlss-webgpu] bridge contract", {
      render: [frame.renderWidth, frame.renderHeight],
      output: [frame.outputWidth, frame.outputHeight],
      color: frame.color.texture.name,
      depth: frame.depth?.texture.name,
      motion: frame.motion?.texture.name,
      reactive: frame.reactive?.texture.name,
      control: frame.control?.texture.name,
      jitter: frame.jitter,
      previousJitter: frame.previousJitter,
      reset: frame.reset
    });
  }
  if (state.live && state.initialRunScheduled && !state.pendingProductionFrame) state.captureRequested = true;
  if (state.captureRequested && !state.live && !viewerConverged(state.viewer)) return;
  if (state.captureRequested && state.running && PRODUCTION_RUNTIME) {
    try {
      const preferredSlot = state.pendingProductionFrame?.slotIndex ?? (state.activeSlot === 0 ? 1 : 0);
      const pending = captureProductionColor(frame, preferredSlot);
      if (state.productionPipeline && state.productionPipeline.geometry.validWidth === pending.renderWidth && state.productionPipeline.geometry.validHeight === pending.renderHeight) {
        pending.uploadMilliseconds = state.productionPipeline.upload(
          pending.slotIndex,
          pending.color,
          pending.motion
        );
        pending.uploaded = true;
      }
      state.pendingProductionFrame = pending;
      state.captureRequested = false;
      state.rerunRequested = false;
      if (state.viewer) state.viewer.renderEnabled = false;
      setStatus(`Queued fresh RGBA16F frame in slot ${pending.slotIndex + 1}/2 while WebGPU is busy`);
    } catch (error) {
      console.error(error);
      setStatus(error.message || String(error), true);
    }
  } else if (state.captureRequested && !state.running) {
    void runCapturedFrame(frame);
  }
  globalThis.__dlssWebGpuExact = state;
}
function requestNeuralFrame() {
  if (!globalThis.dlssSceneReady || !state.settings.enabled || !state.viewer || !state.frame) return;
  if (state.running) {
    state.rerunRequested = true;
  }
  state.captureRequested = true;
  state.viewer.renderEnabled = true;
  setStatus(`Requesting a fresh WebGI color frame \xB7 ${describeFrame(state.frame)}`);
}
function scheduleInitialRun() {
  if (state.initialRunScheduled || !globalThis.dlssSceneReady || !state.frame) return;
  state.initialRunScheduled = true;
  if (!state.settings.enabled) {
    setStatus("Neural rendering off \xB7 WebGI source");
    globalThis.dlssLoading?.finish();
    return;
  }
  setStatus(`${sceneLabel} loaded \xB7 resolving WebGI antialiasing`);
  globalThis.dlssLoading?.stage("Preparing first frame", `${sceneLabel} loaded \xB7 resolving antialiasing`);
  requestNeuralFrame();
}
function formatMilliseconds(value) {
  return value == null ? "unavailable" : value.toFixed(1);
}
function toggleLive() {
  if (!globalThis.dlssSceneReady || !state.settings.enabled) return;
  state.live = !state.live;
  document.querySelector("#nrLive")?.setAttribute("aria-pressed", String(state.live));
  if (state.live) requestNeuralFrame();
  else {
    state.pendingProductionFrame = null;
    state.captureRequested = false;
    state.rerunRequested = false;
    state.viewRevision++;
    state.neuralReady = false;
    setNeuralVisible(false);
    requestNeuralFrame();
  }
}
function toggleComparison() {
  if (!state.settings.enabled) return;
  state.compareSource = !state.compareSource;
  if (state.compareSource) resizeHoldCanvas?.classList.remove("visible");
  else if (state.resizePending) resizeHoldCanvas?.classList.add("visible");
  setNeuralVisible(!state.compareSource);
}
function compareShortcut() {
  if (state.neuralReady) toggleComparison();
  else requestNeuralFrame();
}
function scheduleResizeRebuild() {
  const firstEvent = !state.resizePending;
  state.resizePending = true;
  state.resizeSettled = false;
  state.resizeRevision++;
  state.viewportWidth = window.innerWidth;
  state.viewportHeight = window.innerHeight;
  if (firstEvent) {
    void preservePresentedFrame();
    if (state.settings.enabled && state.result && globalThis.dlssSceneReady) {
      globalThis.dlssLoading?.begin(
        "Resizing DLSS 5",
        "Preparing neural rendering for the new window size"
      );
    }
  }
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!globalThis.dlssSceneReady || !state.viewer) return;
    state.resizeSettled = true;
    state.pendingProductionFrame = null;
    state.captureRequested = false;
    state.rerunRequested = false;
    requestNeuralFrame();
  }, RESIZE_SETTLE_MILLISECONDS);
}
function attach(viewer) {
  if (!viewer || state.viewer === viewer) return;
  const bridge = viewer.getPlugin("DlssBridge");
  if (!bridge || typeof bridge.setFrameConsumer !== "function") {
    setStatus("Exact WebGI scene loaded, but the rebuilt DLSS bridge consumer API is missing", true);
    return;
  }
  state.viewer = viewer;
  state.bridge = bridge;
  bridge.setFrameConsumer(consumeFrame);
  viewer.addEventListener("update", () => {
    if (!globalThis.dlssSceneReady || !state.settings.enabled) return;
    state.viewRevision++;
    if (window.innerWidth !== state.viewportWidth || window.innerHeight !== state.viewportHeight) {
      scheduleResizeRebuild();
      return;
    }
    if (state.resizePending) {
      if (state.resizeSettled) {
        if (state.running) state.rerunRequested = true;
        else requestNeuralFrame();
      }
      return;
    }
    if (state.live) return;
    state.neuralReady = false;
    state.pendingProductionFrame = null;
    state.captureRequested = true;
    setNeuralVisible(false);
  });
  viewer.setDirty();
  setStatus(PRODUCTION_RUNTIME ? `${sceneLabel} scene \xB7 waiting for RGBA16F production frame` : `${sceneLabel} scene \xB7 waiting for five-texture diagnostic frame`);
}
function updateNrSettings(changes) {
  const next = normalizeNrSettings(changes, state.settings);
  if (Object.keys(next).every((key2) => next[key2] === state.settings[key2])) return;
  state.settings = next;
  state.settingsRevision++;
  nrControls.sync(next);
  state.neuralReady = false;
  state.pendingProductionFrame = null;
  setNeuralVisible(false);
  if (!next.enabled) {
    clearTimeout(resizeTimer);
    releasePresentedFrame();
    globalThis.dlssLoading?.finish();
    state.live = false;
    state.captureRequested = false;
    state.rerunRequested = false;
    document.querySelector("#nrLive")?.setAttribute("aria-pressed", "false");
    setStatus("Neural rendering off \xB7 WebGI source");
  } else {
    state.compareSource = false;
    requestNeuralFrame();
  }
}
var outputCanvas, resizeHoldCanvas, status, HALF_TO_FLOAT, PAPER_WHITE_SCALE, TRANSFER_STRENGTH, COLOR_STRENGTH, DEVICE_CAPACITY_HEADROOM, RESIZE_SETTLE_MILLISECONDS, USE_EXTERNAL_CONTROL_MASK, diagnosticQuery, sceneLabel, CAPTURE_NATIVE_REFERENCE_HEAD, CAPTURE_NATIVE_ENC0_DOWN, CAPTURE_NATIVE_DEC5_INPUT, CAPTURE_NATIVE_DEC4_INPUT, CAPTURE_NATIVE_DEC0_INPUT, CAPTURE_NR_REFERENCE, DEC0_PRECISION_SWEEP, DEC0_PRECISION, DEC5_PRECISION, DEC4_PRECISION, PRODUCTION_RUNTIME, outputContext, SR_CAPTURE_SET, state, outputHalfScratch, outputHalfFloat, outputHalfBits, resizeTimer, resumeSceneLive, nrControls;
var init_webgpu_bridge = __esm({
  "src/runtime/webgpu-bridge.js"() {
    init_nr_settings();
    init_nr_controls();
    init_demo_ui();
    init_viewer_convergence();
    init_model_loader();
    init_inference();
    init_sr_model();
    init_sr_inference();
    init_production_pipeline();
    outputCanvas = document.querySelector("#dlssWebGpuOutput");
    resizeHoldCanvas = document.querySelector("#dlssResizeHold");
    status = document.querySelector("#dlssWebGpuStatus");
    HALF_TO_FLOAT = buildHalfFloatTable();
    PAPER_WHITE_SCALE = 1;
    TRANSFER_STRENGTH = 1;
    COLOR_STRENGTH = 1;
    DEVICE_CAPACITY_HEADROOM = 1.35;
    RESIZE_SETTLE_MILLISECONDS = 450;
    USE_EXTERNAL_CONTROL_MASK = false;
    diagnosticQuery = new URLSearchParams(location.search);
    sceneLabel = globalThis.dlssSceneLabel || "Bistro";
    CAPTURE_NATIVE_REFERENCE_HEAD = diagnosticQuery.get("srReferenceHead") === "1";
    CAPTURE_NATIVE_ENC0_DOWN = diagnosticQuery.get("srReferenceEnc0Down") === "1";
    CAPTURE_NATIVE_DEC5_INPUT = diagnosticQuery.get("srReferenceDec5") === "1";
    CAPTURE_NATIVE_DEC4_INPUT = diagnosticQuery.get("srReferenceDec4") === "1";
    CAPTURE_NATIVE_DEC0_INPUT = diagnosticQuery.get("srReferenceDec0") === "1";
    CAPTURE_NR_REFERENCE = diagnosticQuery.get("nrReference") === "1";
    DEC0_PRECISION_SWEEP = diagnosticQuery.get("srDec0Sweep") === "1";
    DEC0_PRECISION = diagnosticQuery.get("srDec0Precision") ?? "f32";
    DEC5_PRECISION = diagnosticQuery.get("srDec5Precision") ?? "f32";
    DEC4_PRECISION = diagnosticQuery.get("srDec4Precision") ?? "f32";
    PRODUCTION_RUNTIME = !(CAPTURE_NATIVE_REFERENCE_HEAD || CAPTURE_NATIVE_ENC0_DOWN || CAPTURE_NATIVE_DEC5_INPUT || CAPTURE_NATIVE_DEC4_INPUT || CAPTURE_NATIVE_DEC0_INPUT || CAPTURE_NR_REFERENCE || DEC0_PRECISION_SWEEP);
    outputContext = PRODUCTION_RUNTIME ? null : outputCanvas.getContext("2d", { alpha: false });
    SR_CAPTURE_SET = CAPTURE_NATIVE_DEC0_INPUT ? "dec0-native-input" : CAPTURE_NATIVE_DEC4_INPUT ? "dec4-native-input" : CAPTURE_NATIVE_DEC5_INPUT ? "dec5-native-input" : CAPTURE_NATIVE_REFERENCE_HEAD ? "head-contract" : "full-remap";
    state = {
      settings: readNrSettings(),
      settingsRevision: 0,
      viewRevision: 0,
      viewer: null,
      bridge: null,
      frame: null,
      frameCount: 0,
      snapshot: null,
      model: null,
      inference: null,
      productionPipeline: null,
      captureSlots: [],
      captureGeometry: "",
      nextCaptureSlot: 0,
      pendingProductionFrame: null,
      srModel: null,
      srInference: null,
      modelCapacity: null,
      result: null,
      running: false,
      live: false,
      compareSource: false,
      activeSlot: null,
      captureRequested: false,
      rerunRequested: false,
      neuralReady: false,
      neuralVisible: false,
      resizePending: false,
      resizeSettled: false,
      resizeRevision: 0,
      startupGraphWarmed: false,
      startupWarmupFrames: 0,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      initialRunScheduled: false,
      statusHistory: []
    };
    outputHalfScratch = new ArrayBuffer(4);
    outputHalfFloat = new Float32Array(outputHalfScratch);
    outputHalfBits = new Uint32Array(outputHalfScratch);
    window.addEventListener("resize", scheduleResizeRebuild);
    window.addEventListener("dlss-viewer-ready", (event) => attach(event.detail));
    if (globalThis.dlssViewer) attach(globalThis.dlssViewer);
    else {
      const waitForViewer = setInterval(() => {
        if (!globalThis.dlssViewer) return;
        clearInterval(waitForViewer);
        attach(globalThis.dlssViewer);
      }, 50);
    }
    setInterval(scheduleInitialRun, 250);
    window.addEventListener("keydown", (event) => {
      if (event.target instanceof Element && event.target.closest("input, select, textarea, [contenteditable=true]")) return;
      if (event.code === "KeyL" && !event.repeat && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        toggleLive();
      } else if (event.code === "F6" && !event.repeat) {
        event.preventDefault();
        compareShortcut();
      } else if (event.code === "KeyR" && !event.repeat && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        requestNeuralFrame();
      }
    }, true);
    globalThis.__dlssWebGpuExact = state;
    setStatus(`${sceneLabel} scene \xB7 waiting for WebGI viewer`);
    resumeSceneLive = false;
    demoUi.mountRuntime(state, {
      render: requestNeuralFrame,
      toggleLive,
      compare: toggleComparison,
      compareShortcut,
      async beforeSceneChange() {
        clearTimeout(resizeTimer);
        releasePresentedFrame();
        resumeSceneLive = state.live;
        state.live = false;
        state.pendingProductionFrame = null;
        state.captureRequested = false;
        state.rerunRequested = false;
        if (state.viewer) state.viewer.renderEnabled = false;
        while (state.running) await new Promise((resolve) => setTimeout(resolve, 16));
        state.frame = null;
        state.snapshot = null;
        state.result = null;
        state.neuralReady = false;
        state.neuralVisible = false;
        state.compareSource = false;
        state.lastNrSourceFrame = null;
        state.initialRunScheduled = false;
        state.frameCount = 0;
        outputCanvas.classList.remove("visible");
      },
      afterSceneChange() {
        sceneLabel = globalThis.dlssSceneLabel || "Bistro";
        state.live = resumeSceneLive && state.settings.enabled;
        state.viewer?.setDirty();
      }
    });
    nrControls = PRODUCTION_RUNTIME ? mountNrControls(state.settings, updateNrSettings) : { sync() {
    } };
    if (!PRODUCTION_RUNTIME && document.querySelector("#nrSettings")) document.querySelector("#nrSettings").hidden = true;
    state.setSettings = updateNrSettings;
  }
});

// src/runtime/viewer-runtime.js
init_demo_ui();
Promise.resolve().then(() => (init_webgpu_bridge(), webgpu_bridge_exports)).catch((error) => {
  globalThis.dlssLoading?.fail(error);
  console.error(error);
  const status2 = document.querySelector("#dlssWebGpuStatus");
  status2.dataset.state = "error";
  status2.textContent = `Unable to initialize DLSS: ${error.message}`;
});
//# sourceMappingURL=runtime.js.map
