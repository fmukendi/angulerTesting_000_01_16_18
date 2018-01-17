import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should raise votechanged event when upvoted', () => {
    let totalVotes = null;
    component.voteChanged.subscribe( tv => totalVotes = tv);//EventEmitter is an Observable

    component.upVote();

    // expect(totalVotes).not.toBeNull();
    expect(totalVotes).toBe(1);
  });
});