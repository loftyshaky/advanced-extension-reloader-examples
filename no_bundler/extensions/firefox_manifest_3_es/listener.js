var e = [
        `hmhmmmajoblhmohkmfjeoamhdpodihlg`,
        `hagknokdofkmojolcpbddjfdjhnjdkae`,
        `bcpgohifjmmcoiemghdamamlkbcbgifg`,
        `advanced-extension-reloader@loftyshaky`,
    ],
    t = self,
    n = t.chrome !== void 0 && t.chrome.runtime ? t.chrome : t.browser;
n.runtime.onMessageExternal.addListener((t, r) => {
    let i = t.msg;
    if (r.id && e.includes(r.id)) {
        if (i === `reload_extension`) n.runtime.reload();
        else if (i === `open_popup`)
            return n.action
                .openPopup()
                .then(() => !0)
                .catch(() => !1);
        else if (i === `check_if_popup_is_open`)
            return n.runtime
                .getContexts({ contextTypes: [`POPUP`] })
                .then((e) => e.length !== 0)
                .catch(() => !1);
    }
    return !1;
});
