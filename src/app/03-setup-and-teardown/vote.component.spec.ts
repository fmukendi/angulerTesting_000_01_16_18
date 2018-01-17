import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  //let component = new VoteComponent();
  let component: VoteComponent; // with this component will have intellisense

  beforeEach(() => {
    component = new VoteComponent();
  });

  afterEach(() => {});
  beforeAll(() => {});
  afterAll(() => {});


  it('should increment totalVotes when upvoted', () => {
    // let component = new VoteComponent(); // Arrange 
    component.upVote(); // Act 
    expect(component.totalVotes).toBe(1); // Assert
  });
  
  it('should decrement totalVotes when downvoted', () => {
    // let component = new VoteComponent(); // Arrange 
    component.downVote(); // Act 
    expect(component.totalVotes).toBe(-1); // Assert
  });

});