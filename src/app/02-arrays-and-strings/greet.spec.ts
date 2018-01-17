
import{ greet } from './greet';

describe('greet', () => {
 it('should include the name in the message', () => {
    
    // expect(greet('Franck')).toBe('Welcome Franck');
    expect(greet('Franck')).toContain('Franck');
 });

});