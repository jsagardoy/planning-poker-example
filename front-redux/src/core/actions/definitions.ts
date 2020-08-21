const prefix = '[GLOBAL]';

export const actionIds = {
  SET_MASTER_NICK_NAME: `${prefix}[0] Sets the nickname and isMaster of the user + fire socket connection.`,
  ROOM_REQUEST_START: `${prefix}[1] Fires room name request to server.`,
  ROOM_REQUEST_COMPLETED: `${prefix}[2] sets the room where the user is going to be connected`,
  ADD_NEW_PLAYER: `${prefix}[3] New player arrived add it to the list of players`,
  RESET_VOTED_FLAG_ON_EVERY_PLAYER: `${prefix}[4] Set voted flag to false for every player`,
  RESET_VOTE_VALUE_ON_EVERY_PLAYER: `${prefix}[5] Set vote value to empty string`,
  USER_VOTED: `${prefix}[6] A given user has voted - no value is informed here`,
};
