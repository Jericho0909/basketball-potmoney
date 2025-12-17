import { Routes, Route, Navigate } from "react-router-dom";
import Adminpage from "./pages/adminpage";
import AdminMainPage from "./pages/adminmainpage";
import Versus from "./components/adminComponents/section/versusComponents/versus/versus";
import Matches from "./components/adminComponents/section/matchesComponents/matches/matches";
import VotePage from "./pages/votepage";
import { ModalProvider } from "./context/modalContext";
import { PlayerFormProvider } from "./context/playerFormContext";
import { ImageProvider } from "./context/imageContext";
import { VideoProvider } from "./context/videoContext";
import { MatchUpProvider } from "./context/matchupContext";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { FireBaseFetchDataProvider } from "./context/firebaseFetchData";
import { FirebaseActionProvider } from "./context/firebaseActionContext";
function App() {
  return (
      <ModalProvider>
          <WindowSizeProvider>
            <FireBaseFetchDataProvider>
              <FirebaseActionProvider>
                <Routes>
                  <Route
                    path="/"
                    element={<VotePage/>}
                  />
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
              </FirebaseActionProvider>
            </FireBaseFetchDataProvider>
          </WindowSizeProvider>
      </ModalProvider>
  )
}

export default App
