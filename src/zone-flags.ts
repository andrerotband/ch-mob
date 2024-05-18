/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
// eslint-disable-next-line no-underscore-dangle
(window as any).__Zone_disable_requestAnimationFrame = true;
(window as any).__Zone_disable_on_property = true;
(window as any).__zone_disable_customElements = true;
(window as any).__zone_symbol__PASSIVE_EVENTS = ['scroll', 'mouse', 'touchstart', 'touchmove', 'mouseup'];

(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove', 'touchstart', 'touchmove']
