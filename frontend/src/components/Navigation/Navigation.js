import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
//root Routes
/*import all component*/
const router = createBrowserRouter([
  {
    path:'/',
    element:<div>Root route</div>
  },
  {
    path:'/register',
    element:<div>register route</div>
  },
  
  
])

function Navigation() {
  return (
    <main className="text-3xl font-bold underline">
      <RouterProvider router={router}></RouterProvider>
    </main>
    
  );
}

export default Navigation;
