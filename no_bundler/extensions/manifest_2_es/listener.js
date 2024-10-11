/**
 * Copyright 2024
 */

const allowed_advanced_extension_reloader_ids=["hmhmmmajoblhmohkmfjeoamhdpodihlg","hagknokdofkmojolcpbddjfdjhnjdkae","bcpgohifjmmcoiemghdamamlkbcbgifg"];class Listener{constructor(){this.gl=self,this.we=void 0!==this.gl.chrome&&this.gl.chrome.runtime?this.gl.chrome:this.gl.browser,this.listen=()=>{this.we.runtime.onMessageExternal.addListener(((msg,sender,sendResponse)=>{const msg_str=msg.msg;allowed_advanced_extension_reloader_ids.includes(sender.id)&&("reload_extension"===msg_str?(sendResponse(!0),this.we.runtime.reload()):"open_popup"===msg_str&&(sendResponse(!0),this.we.action.openPopup(void 0,(()=>{this.we.runtime.lastError}))))}))}}}export{Listener as default};
