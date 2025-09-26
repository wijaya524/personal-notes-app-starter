import { createContext } from "react";
import React from "react";


const Lang = createContext({
    language: "id",
    setLanguage: () => {}
})
export default Lang;