import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SocketStatus } from '../../const';
import { WebSocketService } from '../../service/webSocket';
import { rotatePipes } from '../../store/map/map.slice';
import { RootState } from '../../store/store';
import { Button, Container, LevelHead, Pipe, Row, Wrapper } from './index.styled';

const LevelMap: React.FC = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.socket);
  const map = useSelector((state: RootState) => state.map);

  const init = React.useCallback(async () => {
    await WebSocketService.connect();
    WebSocketService.sendWSMessage(`new ${map.level}`);
    WebSocketService.sendWSMessage(`map`);
  }, [map.level]);

  const verifyLevel = React.useCallback(async () => {
    WebSocketService.sendWSMessage(`verify`);
  }, []);

  React.useEffect(() => {
    if (socket.status === SocketStatus.NOT_CONNECTED) {
      init();
    }
    // eslint-disable-next-line
  }, [socket.status]);

  React.useEffect(() => {
    WebSocketService.sendWSMessage(`new ${map.level}`);
    WebSocketService.sendWSMessage(`map`);
    // eslint-disable-next-line
  }, [map.level]);

  const setRotations = React.useCallback(
    async (rowIdx: number, colIdx: number) => {
      try {
        dispatch(rotatePipes([rowIdx, colIdx]));
        await WebSocketService.sendWSMessage(`rotate ${colIdx} ${rowIdx}`);
      } catch (error) {}
    },[dispatch]);

  return (
    <Wrapper>
      <Container>
        <LevelHead>
          Level {map.level}
        </LevelHead>
        {
          map.map?.map((row, rowIdx) => (
            <Row key={rowIdx}>
              {
                row.map((col, colIdx) => (
                  <Pipe
                    key={colIdx}
                    data-tile={col}
                    onClick={() => {
                      setRotations(rowIdx, colIdx);
                    }}
                  />
                ))
              }
            </Row>
          ))
        }
        <Button
          onClick={verifyLevel}
        >
          Verify level
        </Button>
      </Container>
    </Wrapper>
  )
}

export default LevelMap;