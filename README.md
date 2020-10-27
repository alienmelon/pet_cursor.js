# pet_cursor.js
Pet cursor (Neko cursor) is a simple javascript file that turns your website's cursor into a cute animated pet! (for the desktop)

![Demo gif](http://tetrageddon.com/petcursor/demo3.gif)

Now your desktop visitors can play as a cute creature as they browse your site!

### [Click here for a demo.](http://tetrageddon.com/petcursor/)

The default character is based on [the Neko desktop pet](https://en.wikipedia.org/wiki/Neko_(software)), you can use this default, or easily change the character to your own. Customization is simple, just follow the instructions in the **pet_cursor.js** file and update a few arrays.

## Features include...
* Cursor faces the direction of the mouse.
* Cursor has a small interaction state, to interact with specific elements on a site (like hyperlinks).
* It's easy to customize.

## Getting Pet Cursor on your page is easy! Just do the following...

Place **pet_cursor.js** and the **pet_cursor** folder in the same directory as the page that you would like to run it on.
Then include the javascript by copying the code bellow and pasting it in your website's "head" tag...
```
<script src="pet_cursor.js"></script>	
```
Then change your page's **body** tag to call **startPetCursor();** on load...
```
<body onload="startPetCursor();">
```
That's it! Your page should now have a cute little playable cursor character...
