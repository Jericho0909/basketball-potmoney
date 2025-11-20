import { Routes, Route, Navigate } from "react-router-dom";
import Adminpage from "./pages/adminpage";
import AdminMainPage from "./pages/adminmainpage";
import Versus from "./components/adminComponents/section/versusComponents/versus/versus";
import { FetchDataProvider } from "./context/fetchDataContext";
import { ModalProvider } from "./context/modalContext";
import { PlayerFormProvider } from "./context/playerFormContext";
import { ImageProvider } from "./context/imageContext";
import { VideoProvider } from "./context/videoContext";
function App() {
  return (
    <FetchDataProvider>
      <ModalProvider>
        <Routes>
          <Route 
            path="/admin" 
            element={<Adminpage/>} 
          />
          <Route
            path="/adminmain/:username"
            element={
              <PlayerFormProvider>
                <ImageProvider>
                  <VideoProvider>
                    <AdminMainPage/>
                  </VideoProvider>
                </ImageProvider>
              </PlayerFormProvider>
            }
          >
            <Route
              index 
              element={
                <Navigate to="Versus" replace />
              }
            />
            <Route
              path="Versus"
              element={<Versus/>}          
            />
          </Route>
        </Routes>
      </ModalProvider>
    </FetchDataProvider>
  )
}

export default App
