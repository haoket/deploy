import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import AnimatedRoutes from "./user/components/amination/AnimatedRoutes";
// Import necessary FontAwesome modules
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add the icons you need to the library
library.add(fas);

// import { router } from "./routes/Routes";



const App = () => {


  return (



    <RouterProvider router={router} >
      <AnimatedRoutes />
    </RouterProvider>

  );
};

export default App;
