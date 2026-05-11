use leptos::{ prelude::*};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = ["window", "__TAURI__", "core"])]
    async fn invoke(cmd: &str, args: JsValue) -> JsValue;
}


#[component]
pub fn app() -> impl IntoView {
    view! {
        <main class="container">
           <h1>"we yap"</h1>
        </main>
    }
}
