import { SignedDevconTicket } from './../Attestation/SignedDevonTicket.js';
export const config = {
    "devcon-ticket": {
        tokenName: 'devcon-ticket',
        attestationOrigin: "https://stage.attestation.id",
        tokenOrigin: "http://localhost:3002",
        tokenUrlName: 'ticket',
        tokenSecretName: 'secret',
        tokenIdName: 'id',
        unsignedTokenDataName: 'ticket',
        tokenParser: SignedDevconTicket,
        localStorageItemName: 'dcTokens',
        localStorageEthKeyItemName: 'dcEthKeys',
        fabButton: '<svg width="100%" height="100%" viewBox="0 0 35 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(4.74075,0,0,4.74075,0.34539,-0.00867743)"><circle cx="3.615" cy="3.709" r="3.654" style="fill:rgb(48,48,82);"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M335.21,270.71" style="fill:none;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M238.431,167.123L335.42,217.46L335.42,0L238.431,167.123Z" style="fill:rgb(50,163,215);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M429.734,167.123L335.42,217.46L335.42,0L429.734,167.123Z" style="fill:rgb(33,67,145);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M262.11,170.77L335.42,217.46L335.42,43.49L262.11,170.77Z" style="fill:rgb(228,35,39);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M408.74,170.77L335.42,217.46L335.42,43.49L408.74,170.77Z" style="fill:rgb(128,21,28);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M280.44,182.44L335.42,217.46L335.42,86.99L280.44,182.44Z" style="fill:rgb(252,206,13);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M390.41,182.44L335.42,217.46L335.42,86.99L390.41,182.44Z" style="fill:rgb(242,180,37);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M298.76,194.12L335.42,217.46L335.42,130.48L298.76,194.12Z" style="fill:rgb(249,239,96);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M372.08,194.12L335.42,217.46L335.42,130.48L372.08,194.12Z" style="fill:rgb(236,225,26);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M429.734,167.232L335.42,311.79L335.42,236.29L429.734,167.232Z" style="fill:rgb(33,67,145);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M238.861,167.232L335.42,311.79L335.42,236.29L238.861,167.232Z" style="fill:rgb(50,163,215);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M395.05,198.26L335.43,285.35L335.43,236.23L395.05,198.26Z" style="fill:rgb(128,21,28);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M276.08,198.26L335.43,285.35L335.43,236.23L276.08,198.26Z" style="fill:rgb(228,35,39);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M362.46,219.02L335.46,258.45L335.46,236.21L362.46,219.02Z" style="fill:rgb(242,180,37);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><path d="M308.59,219.02L335.46,258.45L335.46,236.21L308.59,219.02Z" style="fill:rgb(252,206,13);fill-rule:nonzero;stroke:white;stroke-width:20.06px;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="18.752" y="25.246" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781436,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="18.752" y="16.917" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781623,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="19.862" y="19.003" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781436,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="22.078" y="19.003" width="3.374px" height="3.126px" transform="matrix(0.843504,0,0,0.781436,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="20.973" y="21.078" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781623,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="19.862" y="23.159" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781623,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="17.641" y="23.159" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781623,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="15.419" y="19.003" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781436,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="16.526" y="21.078" width="3.374px" height="3.126px" transform="matrix(0.843504,0,0,0.781623,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="17.641" y="19.003" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781436,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="19.862" y="14.841" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781436,0,0)"/></g></g><g transform="matrix(0.0747812,0,0,0.0747812,-7.58311,5.84198)"><g transform="matrix(13.3723,-0,-0,13.3723,101.404,-78.121)"><use xlink:href="#_Image1" x="17.641" y="14.841" width="3.373px" height="3.126px" transform="matrix(0.843317,0,0,0.781436,0,0)"/></g></g><g transform="matrix(1,0,0,1,-0.819193,-1.2433)"><g transform="matrix(0.0747812,0,0,0.0747812,-6.76392,7.08528)"><path d="M335.21,270.71" style="fill:none;"/></g><g transform="matrix(0.0747812,0,0,0.0747812,-6.76392,7.08528)"><path d="M243.78,159.1L335.42,217.46L335.42,0L243.78,159.1Z" style="fill:rgb(50,163,215);fill-rule:nonzero;"/><path d="M427.06,159.1L335.42,217.46L335.42,0L427.06,159.1Z" style="fill:rgb(33,67,145);fill-rule:nonzero;"/><path d="M262.11,170.77L335.42,217.46L335.42,43.49L262.11,170.77Z" style="fill:rgb(228,35,39);fill-rule:nonzero;"/><path d="M408.74,170.77L335.42,217.46L335.42,43.49L408.74,170.77Z" style="fill:rgb(128,21,28);fill-rule:nonzero;"/><path d="M280.44,182.44L335.42,217.46L335.42,86.99L280.44,182.44Z" style="fill:rgb(252,206,13);fill-rule:nonzero;"/><path d="M390.41,182.44L335.42,217.46L335.42,86.99L390.41,182.44Z" style="fill:rgb(242,180,37);fill-rule:nonzero;"/><path d="M298.76,194.12L335.42,217.46L335.42,130.48L298.76,194.12Z" style="fill:rgb(249,239,96);fill-rule:nonzero;"/><path d="M372.08,194.12L335.42,217.46L335.42,130.48L372.08,194.12Z" style="fill:rgb(236,225,26);fill-rule:nonzero;"/><path d="M427.06,177.93L335.42,311.79L335.42,236.29L427.06,177.93Z" style="fill:rgb(33,67,145);fill-rule:nonzero;"/><path d="M244.21,177.93L335.42,311.79L335.42,236.29L244.21,177.93Z" style="fill:rgb(50,163,215);fill-rule:nonzero;"/><path d="M395.05,198.26L335.43,285.35L335.43,236.23L395.05,198.26Z" style="fill:rgb(128,21,28);fill-rule:nonzero;"/><path d="M276.08,198.26L335.43,285.35L335.43,236.23L276.08,198.26Z" style="fill:rgb(228,35,39);fill-rule:nonzero;"/><path d="M362.46,219.02L335.46,258.45L335.46,236.21L362.46,219.02Z" style="fill:rgb(242,180,37);fill-rule:nonzero;"/><path d="M308.59,219.02L335.46,258.45L335.46,236.21L308.59,219.02Z" style="fill:rgb(252,206,13);fill-rule:nonzero;"/><path d="M335.42,217.46L347.95,195.72L322.9,195.72L335.42,217.46Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M335.42,130.48L347.95,108.73L322.9,108.73L335.42,130.48Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M347.95,152.22L360.47,130.48L335.42,130.48L347.95,152.22Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M373,152.22L385.53,130.48L360.47,130.48L373,152.22Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M360.47,173.97L373,152.22L347.95,152.22L360.47,173.97Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M347.95,195.72L360.47,173.97L335.42,173.97L347.95,195.72Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M322.9,195.72L335.42,173.97L310.37,173.97L322.9,195.72Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M297.84,152.22L285.32,130.48L310.37,130.48L297.84,152.22Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M310.37,173.97L297.84,152.22L322.9,152.22L310.37,173.97Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M322.9,152.22L310.37,130.48L335.42,130.48L322.9,152.22Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M347.95,108.73L360.47,86.99L335.42,86.99L347.95,108.73Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/><path d="M322.9,108.73L310.37,86.99L335.42,86.99L322.9,108.73Z" style="fill:white;fill-opacity:0.75;fill-rule:nonzero;"/></g></g><defs><image id="_Image1" width="4px" height="4px" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAANUlEQVQImWP8////ZAYGBjUGCLjFxMDAwM+AAHxMDAwM8xkYGNigeD4LAwPDAQYGBheoioMAUS8HxsxdocEAAAAASUVORK5CYII="/></defs></svg'
    }
};
