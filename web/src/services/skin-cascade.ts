/** Reduce built-in theme specificity while a community skin is active.
 * The community skin is loaded after this stylesheet and should own appearance
 * without needing !important or private component selectors.
 */
export function scopeBuiltinThemeForCustomSkin(css: string, theme: "light" | "dark", skinId: string): string {
  const sourceRoot = `.ws-skin-root[data-ws-skin="builtin.${theme}"]`;
  const customRoot = `:where(.ws-skin-root[data-ws-skin="${skinId}"])`;
  return css.replaceAll(sourceRoot, customRoot);
}

/** The built-in base under a community skin. The light base is lowered with :where() so a skin can
 * override it freely. The dark base keeps the built-in night skin's full specificity: the components'
 * own (light) scoped styles would otherwise win over it. Community skin rules load later, so on equal
 * specificity they still win.
 */
export function scopeBuiltinBaseForCustomSkin(css: string, theme: "light" | "dark", skinId: string): string {
  if (theme === "light") return scopeBuiltinThemeForCustomSkin(css, "light", skinId);
  return css.replaceAll('.ws-skin-root[data-ws-skin="builtin.dark"]', `.ws-skin-root[data-ws-skin="${skinId}"]`);
}

/** A skin on the dark base must still beat that full-specificity base, so its scope gets one extra
 * class (`.ws-skin-root.ws-skin-root`), which only raises specificity and matches the same element.
 */
export function boostCustomSkinCss(css: string, skinId: string): string {
  return css.replaceAll(`.ws-skin-root[data-ws-skin="${skinId}"]`, `.ws-skin-root.ws-skin-root[data-ws-skin="${skinId}"]`);
}
