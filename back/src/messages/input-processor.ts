import { InputMessageTypes, OutputMessageTypes, getMasterRoom } from './consts';
import {
  Action,
  InputUserVoted,
  InputEstablishConnectionMaster,
  InputEstablishConnectionPlayer,
  OutputConnectionEstablishedMaster,
  OutputConnectionEstablishedPlayer,
  SocketInfo,
} from './model';
import {
  vote,
  isMasterUser,
  getRoomFromConnectionId,
  resetVotes,
  isRoomAvailable,
  addNewUser,
} from '../storage';
import { processOuputMessage } from './output-processor';

export const processInputMessage = (
  socketInfo: SocketInfo,
  action: Action
): Action[] => {
  let outputActionCollection: Action[] = [];
  switch (action.type) {
    case InputMessageTypes.ESTABLISH_CONNECTION_MASTER:
      const payloadECM: InputEstablishConnectionMaster = action.payload;
      outputActionCollection = handleEstablishConnectionMaster(
        socketInfo,
        payloadECM.nickname,
        payloadECM.room
      );
      break;
    case InputMessageTypes.ESTABLISH_CONNECTION_PLAYER:
      const payloadPlayer: InputEstablishConnectionPlayer = action.payload;
      outputActionCollection = handleEstablishConnectionPlayer(
        socketInfo,
        payloadPlayer.nickname,
        payloadPlayer.room
      );
      break;
    case InputMessageTypes.CREATE_STORY:
      break;

    case InputMessageTypes.USER_VOTED:
      const payload: InputUserVoted = action.payload;
      handleVote(socketInfo.connectionId, payload.vote);
      break;

    case InputMessageTypes.END_VOTE_TIME:
      break;
  }

  return outputActionCollection;
};

const handleEstablishConnectionMaster = (
  socketInfo: SocketInfo,
  nickname: string,
  room: string
): Action[] => {
  if (!nickname || !room) {
    // Ignore
    return [];
  }

  if (isRoomAvailable(room)) {
    addNewUser(socketInfo.connectionId, { room, nickname, isMaster: true });
    socketInfo.socket.join(room);
    socketInfo.socket.join(getMasterRoom(room));

    const payload: OutputConnectionEstablishedMaster = { newUser: nickname };
    return [
      { type: OutputMessageTypes.CONNECTION_ESTABLISHED_MASTER, payload },
    ];
  } else {
    // TODO Enque Error master
    return [{ type: OutputMessageTypes.ERROR_ROOM_BUSY }];
  }
};

const handleEstablishConnectionPlayer = (
  socketInfo: SocketInfo,
  nickname: string,
  room: string
): Action[] => {
  if (!nickname || !room) {
    // Ignore
    return [];
  }
  if (isRoomAvailable(room)) {
    // TODO Enque Error master
    return [{ type: OutputMessageTypes.ERROR_CANNOT_FIND_ROOM }];
  } else {
    addNewUser(socketInfo.connectionId, { room, nickname, isMaster: false });
    socketInfo.socket.join(room);
    const payload: OutputConnectionEstablishedPlayer = { newUser: nickname };
    return [
      { type: OutputMessageTypes.CONNECTION_ESTABLISHED_PLAYER, payload },
    ];
  }
};

const handleCreateStory = (connectionId: string, value: string) => {
  // this should generate output message
  // later TODO: global flag cannot vote, to avoid having users cheating
  // Maybe processInputMessage should return a qeueu of outputMesssages
  const isMaster = isMasterUser(connectionId);
  const room = getRoomFromConnectionId(connectionId);

  if (isMaster) {
    resetVotes(room);
    // enque output message send to all participants new  question
  } else {
    // TODO: Log Error bug in code or somebody trying to be a naughty boy
  }
};

const handleVote = (connectionId: string, value: string) => {
  vote(connectionId, value);
};

const handleEndVoteTime = (connectionId: string) => {
  // this should generate output message
  // later TODO: global flag cannot vote, to avoid having users cheating
  // Maybe processInputMessage should return a qeueu of outputMesssages
  // enque output message end vote and results
};
