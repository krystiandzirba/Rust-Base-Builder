<h1 align="center">Rust Base Builder</h1>

<p align="center">
Rust Base Builder - an app for the popular video game "Rust" run by React Three Fiber. This tool allows you to create any base, simulate a raid and calculate all the building + upkeep cost.
</p>

![image](https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/6851219d-808d-477e-9f78-c22a2eff6962)

<h1 align="center">Key Features:</h1>

<h2 align="center">Base Editor | Edit Mode</h2>

<p align="center">
You can build your base from scratch, view and modify it.
Choose any object from the list on the left side and start placing it on the grid. <br>
Before you place any object, you can rotate it with "Q" and "E" buttons and change the building height level.<br>
  (you can change the rotation degree with the button at the bottom)
</p>

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/332822fa-6a77-47a0-90cf-8d764abd96eb" alt="Image">
  </p>

https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/24f7fa9e-e143-4573-802c-e2f3de5e4fcd

<p align="center">
All the build cost will be displayed on the right side along with the upkeep cost (scaling tiers):<br>
tier 1: 10% for the first 15 objects<br>
tier 2: 15% for next 75 objects<br>
tier 3: 20% for another 75 objects<br>
tier 4: 33% for any object above 175th<br>
  You can also enable the miscs (workbenches, storages, furnaces) to be counted in the build cost (with upkeep ommited)
</p>

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/9903ac00-1015-442d-b83b-5b7146883983" alt="Image">
  </p>

<h3 align="center">Modifying the base</h3>

<p align="center">
You can modify your base only in the edit mode, here you can select any placed object and interact with it.<br>
  
***(when any object is selected):***
  
- WSAD -  move the selected object in 4 directions across the grid.
- SHIFT - change the distance unit of transformed object.
- SPACE - move object up by (distance unit)
- CTRL - move object down by (distance unit)
- DEL | BACKSPACE - delete selected object
- "Q" | "E" - rotate selected object right | left
</p>

https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/0bda418a-99f1-408e-ab8a-1632e128a12e

<p align="center">
you can also manipulate the objects using the control buttons at the bottom of the page:
</p>

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/0f837ddc-573b-4440-b091-45d761ef20da" alt="Image">
  </p>

  <h2 align="center">Modifying the base | triangle foundation, honeycomb and walls</h2>


<p align="center">Currently the fastest and the easiest way to make triangle honeycomb is to place all the walls around it and then edit it with the 0.125 distance unit</p>

  _<p align="center">(however this design is not optimal and will change in the near future, example below)</p>_

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/41531f1b-2d5f-4bb6-8333-f36a1cb20235" alt="Image">
  </p>

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/2d335b82-c4b2-41b4-a477-385098327562" alt="Image">
  </p>

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/a979c2a8-1d32-4fca-a2e4-005612428900" alt="Image">
  </p>


<h2 align="center">Raid Simulator</h2>

<p align="center">
Simulate an raid attack on your own base to test its weaknesses.
</p>

First, choose what do you want to raid with:<br>
- rockets <br> 
- C4s <br> 
- EXP. 5.56 ammo<br>
- satchel charges<br> 
- "most efficient" to automatically calculate the most efficient way to destroy the selected structure.<br>
<br>
<p align="center">
Once you've selected the type, you can start destroying the objects with mouse click. <br>
If you want to start the raid again, or reset it, use the "reset raid" button.
</p>

<p align="center">
    <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/9b614b4e-ca3d-43f1-b00b-5c3b356c9492" alt="Image">
  </p>

https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/0b9ffa6a-8598-4c80-9306-65a5f21b2922

<p align="center">
All of the raid cost will be displayed on the right side, divided on the type and on all of the required resources.<br>
You can also enable the sub-ingredients and gunpowder calculator.
</p>

<p align="center">
  <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/ee37694b-59c8-49d6-927b-c634457c39eb" alt="Image">
</p>

<h1 align="center">Other:</h1>

<h2 align="center">Object visibility</h2>

<p align="center">
  This feature allows you to disable-enable the visibility of specific structures type and the xray (only in edit mode)
</p>

<p align="center">
  <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/48b8c0bc-7600-4012-b02f-e7faafe03b68" alt="Image">
</p>

<h2 align="center">Cameras</h2>

<p align="center">
  Here you can change the type of the camera 2D-3D
</p>

<p align="center">
  <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/ecdc0522-13a1-4147-bd65-57fade4b8585" alt="Image">
</p>

<h2 align="center">Delete objects (edit mode)</h2>

<p align="center">
  Allows to delete either all of the objects or only the selected one form the grid.
</p>

<p align="center">
  <img src="https://github.com/krystiandzirba/Rust-Base-Builder/assets/120574986/3c6b99d8-df03-47f3-a890-0d03031c795c" alt="Image">
</p>

<h1 align="center">Future updates:</h1>

<p align="center">
- Add Armored structures tier<br>
- Add External walls<br>
- Add the most important of the remaining "misc" objects such as beds, fences, shelves, research table, large furnace, repair bench...<br>
- Add Twig and Wood structures tiers (if needed)<br>
- First person mode (depends on performance impact)<br>
- Rust-like object snapping (depends on performance impact)<br>
- Most popular base prebuilds in a single button click<br>
- Faster building<br>
- Object copy + paste<br>
- Undo button<br>
- Placing + Destroying sounds<br>
- Bases saved in browser memory<br>
- Different switchable layouts<br>
- Performance Improvements<br>
- UI | UX tweaking<br>
- Object brush: instead of "click to place", add optional "click and hold to place multiple objects"<br>
</p>

_<h3 align="center">Please note that this app is GPU and Memory heavy, if you experience any performance issues, try using the ***Performance Mode*** available in the settings.</h3>_
