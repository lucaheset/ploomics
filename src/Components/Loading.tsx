import { useLoading } from "../Storage/useLoading";
import React, { useEffect } from "react";
import { Rotate } from "../styles/IsLoadingStyle";
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
        <h1>
          <Rotate>🕷</Rotate>
        </h1>

        
      </div>
    );
  }
};

export default Loading;
