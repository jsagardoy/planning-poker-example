import * as React from 'react';
import Button from '@material-ui/core/Button';
import { VoteOptionsComponent } from 'common-app/components';

interface Props {
  onFinishVoting: () => void;
  onMasterVoteChosen: (vote: string) => void;
  masterVoted: boolean;
}

export const VotingInProgress: React.FC<Props> = (props: Props) => {
  const { onFinishVoting, onMasterVoteChosen, masterVoted } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        {!masterVoted ? (
          <VoteOptionsComponent onVoteChosen={onMasterVoteChosen} />
        ) : (
          <span>You voted</span>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={e => onFinishVoting()}
      >
        Finish Voting
      </Button>
    </div>
  );
};
