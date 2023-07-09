// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useGlobeContext } from "./Context";

function App() {
  const { isLoading } = useGlobeContext();

  if (isLoading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: "6rem" }}></div>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
