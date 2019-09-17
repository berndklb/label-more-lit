import { LitElement, html, css } from 'lit-element';

// Extend the LitElement base class
class LabelMore extends LitElement {

    static get properties() {
        return {
            readmorecaption: { type: String },
            readlesscaption: {type: String},
            contentheight: { type: Number },
            expanded: {type: Boolean},
            isInitialOverflow: {type: Boolean},
            buttonCaption : {type: String},
        };
    }
    constructor() {
        super();
        this.readmorecaption = 'Read more';
        this.readlesscaption = 'Read less';
        this.contentheight = 80;
    }

    firstUpdated(changedProperties) {
        console.log("this.fadecontent: " + this.shadowRoot.getElementById('fadecontent'));
        this.isInitialOverflow = this.isOverflowed(this.shadowRoot.getElementById('fadecontent'));
        console.log("isOverflowed: " + this.isInitialOverflow);
        console.log("expanded1: " + this.expanded);
        this.expanded = !this.isInitialOverflow;
        console.log("expanded1: " + this.expanded);
        
        this.buttonCaption = this.readmorecaption;
    }

    resizeWindow() {
        if(this.isOverflowed(this.$.fadecontent)) {
            this.$.readmore.classList.remove("fits");
            this.$.readmore.classList.add("overflowed");
        } else {
            this.$.readmore.classList.remove("overflowed");
            this.$.readmore.classList.add("fits");
        }
        
        this.adjustHeight();
    }

    toggle() {
        this.expanded = !this.expanded;
        console.log("expanded: " + this.expanded);
        console.log("this.fadecontent: " +this.shadowRoot.getElementById('fadecontent'));
        //this.adjustHeight();

        this.buttonCaption = this.expanded ? this.readlesscaption : this.readmorecaption;
    }

    isOverflowed(element) {
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }
      

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render(){
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <!-- template content -->
      <div id='test'>
        <div id="fadecontainer">
        
        ${this.expanded?
            html`
                <div id="fadecontent" class="full" style="max-height: auto"><slot></slot></div>
                <div id='fade' class="fade full">&nbsp;</div>
            `:
            html`
                <div id="fadecontent" style="max-height: ${this.contentheight}px"><slot></slot></div>
                <div id='fade' class="fade">&nbsp;</div>
            `
        }

        </div>
        ${this.isInitialOverflow?
            html`<span id="readmore" @click="${this.toggle}" class="fade-anchor-text">${this.buttonCaption}</span>`:
            html`<div></div>`
        }
        
      </div>
    `;
  }

  static get styles() {
    return css`

      #fadecontainer {
        position: relative;
      }
      
      #fadecontent{
        position: relative;
        overflow: hidden;
      }
  
      .fade {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-top: 15px;
        /*background-image: linear-gradient(to top, lightgrey, transparent);*/
        /*background: linear-gradient(rgba(255, 255, 255, 0) 0%, var(--radiant-background-color) 100%);*/
        background: linear-gradient(rgba(255, 255, 255, 0) 0%, var(--radiant-background-color, #E1E5EE) 100%);
      }

      .fade.full {
        visibility: hidden;
      }
  
      .fade-anchor-text {
        text-decoration: none;
        vertical-align: middle;
        color: #868e96;
        color: var(--read-more-color);
      }
      .fade-anchor-text:hover {
        cursor: pointer;
      }
      .fade-anchor-text.overflowed {
        visibility: visible;
      }
      .fade-anchor-text.full {
        visibility: hidden;
      }
    `;
  }
}
// Register the new element with the browser.
customElements.define('label-more', LabelMore);