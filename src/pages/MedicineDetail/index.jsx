import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Detail from "../../components/Medicine/Detail";
import CustomLoader from "../../components/Reusable/CustomLoader";
import { getProductById } from "../../utils/api";
import PageName from "../../components/Reusable/PageName";
import selectPageName from "../../components/Reusable/PageName/pageNameSelect";

const MedicineDetail = ({ match }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!product) {
      setLoading(true);
      getProductById(productId).then((res) => {
        const { product, message } = res;
        if (product) {
          setProduct(product);
        }
        if (message) {
          setError(message);
        }
        setLoading(false);
      });
    }
  }, [product, productId]);
  return (
    <>
      <PageName pageName={selectPageName(match.path.slice(0, 17))} />
      <Container fluid className="m-0 p-0  mt-0">
        {error ? (
          <Alert variant="danger" className="w-100">
            {error}
          </Alert>
        ) : (
          <></>
        )}
        {loading ? (
          <CustomLoader size={"50px"} />
        ) : (
          product && <Detail setProduct={setProduct} product={product} />
        )}
      </Container>
    </>
  );
};

export default MedicineDetail;
