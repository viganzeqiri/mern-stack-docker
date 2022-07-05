import { ColorModeScript } from "@chakra-ui/react";
import { Form } from "components";
import { theme } from "theme";

import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Form />
    </div>
  );
}

export default App;
