import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "./components/Posts";

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Posts/>
      </QueryClientProvider>
    </>
  );
}

export default App;
