const allowed_advanced_extension_reloader_ids=["hmhmmmajoblhmohkmfjeoamhdpodihlg","hagknokdofkmojolcpbddjfdjhnjdkae","bcpgohifjmmcoiemghdamamlkbcbgifg"];class Listener{constructor(){this.gl=self,this.we=void 0!==this.gl.chrome&&this.gl.chrome.runtime?this.gl.chrome:this.gl.browser,this.listen=()=>{this.we.runtime.onMessageExternal.addListener(((msg,sender,sendResponse)=>{const msg_str=msg.msg;allowed_advanced_extension_reloader_ids.includes(sender.id)&&("reload_extension"===msg_str?(sendResponse(!0),this.we.runtime.reload()):"open_popup"===msg_str?(sendResponse(!0),this.we.action.openPopup(void 0,(()=>{this.we.runtime.lastError}))):"check_if_popup_is_open"===msg_str&&this.we.runtime.getContexts({contextTypes:["POPUP"]},(contexts=>{sendResponse(0!==contexts.length)})))}))}}}export{Listener as default};