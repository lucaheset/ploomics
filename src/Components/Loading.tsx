import { useLoading } from "../Storage/useLoading";
import { useEffect } from "react";
import { LoadingDiv, Rotate } from "../styles/IsLoadingStyle";
import GlobalStyle from "../styles/global";

const Loading = () => {
  let setIsLoading = useLoading((state) => state.setIsLoading);

  let isLoading = useLoading((state) => state.isLoading);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div>
        <GlobalStyle />

          <LoadingDiv>
            <Rotate>🕷</Rotate>
          </LoadingDiv>
      </div>
    );
  }
};

export default Loading;
