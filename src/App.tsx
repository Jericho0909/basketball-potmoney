import { Routes, Route, Navigate } from "react-router-dom";
import Adminpage from "./pages/adminpage";
import AdminMainPage from "./pages/adminmainpage";
import Versus from "./components/adminComponents/section/versusComponents/versus/versus";
import Matches from "./components/adminComponents/section/matchesComponents/matches/matches";
import { FetchDataProvider } from "./context/fetchDataContext";
import { ModalProvider } from "./context/modalContext";
import { PlayerFormProvider } from "./context/playerFormContext";
import { ImageProvider } from "./context/imageContext";
import { VideoProvider } from "./context/videoContext";
import { MatchUpProvider } from "./context/matchupContext";
import { ActionProvider } from "./context/actionContext";
import { WindowSizeProvider } from "./context/windowsizeContext";
function App() {
  return (
    <FetchDataProvider>
      <ModalProvider>
        <ActionProvider>
          <WindowSizeProvider>
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
                        <MatchUpProvider>
                          <AdminMainPage/>
                        </MatchUpProvider>
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
              <Route
                path="Matches"
                element={<Matches/>}          
              />
              </Route>
            </Routes>
          </WindowSizeProvider>
        </ActionProvider>
      </ModalProvider>
    </FetchDataProvider>
  )
}

export default App
