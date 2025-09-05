import {html, css, LitElement} from 'lit';

export class BatterCount extends LitElement {
  // No styles, headless by default.
  // stolen from nate knowler.
  static styles = new URL(import.meta.url).searchParams.has('styled')? css`
     /* Default styles here.*/
      p {
      color: blue;
     }
  ` : css``;
  
  static properties = {
    strikes: {type: Number},
    balls: {type: Number}, 
    totalPitches: {type: Number}, // Computed from balls + strikes.
    out: {type: Boolean}, // Computed from total strikes.
    walk: {type: Boolean}, // Computed from total balls.
    hitByPitch: {type: Boolean},
    balk: {type: Boolean},
    other: {type: String} // E.g. catcher interference, overridden by slotted content.
  };

  constructor() {
    super();
    this.walk = false;
    this.out = false;
    this.balls = 0;
    this.strikes = 0;
    this.hitByPitch = false;
    this.balk = false;
  }

  // Compute total pitches & out vs walk here.
  willUpdate() {
    this.totalPitches = this.strikes + this.balls;
    if(this.strikes === 3 && this.balls < 4) {
      this.out = true;
    }
    if (this.balls === 4 && this.strikes < 3) {
      this.walk = true;
    }
  }

  render() {
    // TODO: put parts for headless styling? Keep it very minimal. 
    // Use good HTML tags w/ part attributes.
    return html`
        Result: <br/>
        Strikeout: ${this.out} <br/>
        Walk: ${this.walk} <br />
        Balk: ${this.balk} <br /> 
        HBP: ${this.hitByPitch}
        <p>
        Balls and Strikes: <br />
        Balls: ${this.balls} <br /> Strikes: ${this.strikes} <br /> Total Pitches: ${this.totalPitches}</p>
        <slot>
          ${this.other}
        </slot>
        `;
  }
}
customElements.define('batter-count', BatterCount);
