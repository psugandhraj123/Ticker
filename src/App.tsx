import "./styles.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Row,
  Col,
} from "reactstrap";
import { tickerActions } from "./store/index";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./websocket";

export default function App() {
  const dispatch = useDispatch();
  const [
    BID,
    BID_SIZE,
    ASK,
    ASK_SIZE,
    DAILY_CHANGE,
    DAILY_CHANGE_RELATIVE,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW,
  ] = useSelector((state: any) => state.data);
  const isConnected = useSelector((state: any) => state.isConnected);
  socket.addEventListener("message", (msg) => {
    const data = JSON.parse(msg.data);
    if (Array.isArray(data) && Array.isArray(data[1])) {
      dispatch(tickerActions.update(data));
    }
  });
  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center">
          <Card>
            <CardBody>
              <Row>
                <Col> BTC/USD </Col>
                <Col>{LAST_PRICE}</Col>
              </Row>
              <Row>
                <Col> VOL: {VOLUME} BTC</Col>
                <Col>{`${DAILY_CHANGE} ${DAILY_CHANGE_RELATIVE}`}</Col>
              </Row>
              <Row>
                <Col> LOW: {LOW} </Col>
                <Col> HIGH: {HIGH}</Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                className="bg-success "
                disabled={isConnected}
                onClick={() => {
                  dispatch(tickerActions.connect());
                }}
              >
                Connect
              </Button>
              <Button
                className="bg-danger ms-5"
                disabled={!isConnected}
                onClick={() => {
                  dispatch(tickerActions.disconnect());
                }}
              >
                Disconnect
              </Button>
            </CardFooter>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
