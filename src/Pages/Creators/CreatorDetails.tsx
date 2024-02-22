import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { BASE_URL_CREATORS, ts, hashCookies } from "../../Constants";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../Components/Header";
import GlobalStyle from "../../styles/global";
import { Container, CardList, DetailedCard } from "../../styles/styles";
import Loading from "../../Components/Loading";

interface Comic {
  name: string;
  resourceURI: string
}

interface Creator {
  fullName: string;

  comics: {
    available: number;
    collectionURI: string;
    items: Comic[];
    returned: number;
  };
  thumbnail: {
    path: string;
    extension: string;
  };
}

const CreatorDetails = () => {
  const { creatorId } = useParams(); 
  const [creatorDetail, setCreatorDetail] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL_CREATORS}/${creatorId}?ts=${ts}&apikey=${Cookies.get(
          "UserPublicApi"
        )}&hash=${hashCookies}`
      )
      .then((response) => {
        const creatorData = response.data.data.results[0];
        setCreatorDetail(creatorData);
        setLoading(false);
        console.log(creatorData);

      })
      .catch((error) => {
        console.log(error);
        toast.warning("Make sure you are authenticated to access this page");
        setLoading(false);
      });
  }, [creatorId]);



  return (
    <div>
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      <Container>
        {loading ? (
          <Loading />
        ) : creatorDetail ? (
          <CardList>
            <DetailedCard thumbnail={creatorDetail.thumbnail}>
              <div id="img" />
              <h2>{creatorDetail.fullName}</h2>
              <p>
                Comics:
                {creatorDetail.comics.items.length > 0
                  ? creatorDetail.comics.items.map((comic, index) => {
                      const comicId = comic.resourceURI.split("/").pop();
                      return (
                        <span key={index}>
                          <Link to={`/comics/${comicId}`}>
                            {comic.name}
                          </Link>
                          {index < creatorDetail.comics.items.length - 1 ? ", " : ""}
                        </span>
                      );
                    })
                  : "No comics found."}
              </p>
            </DetailedCard>
          </CardList>
        ) : (
          <p>Creator details not available.</p>
        )}
      </Container>
      <GlobalStyle />
    </div>
  );
};

export default CreatorDetails;
