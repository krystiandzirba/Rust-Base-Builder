<h1 align="center">Rust Base Builder</h1>

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/krystiandzirba/Rust-Base-Builder?color=blue)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/krystiandzirba/Rust-Base-Builder?color=blue)
![GitHub](https://img.shields.io/github/license/krystiandzirba/Rust-Base-Builder?color=orange)
[![GitHub last commit](https://img.shields.io/github/last-commit/krystiandzirba/Rust-Base-Builder?color=green)](https://github.com/krystiandzirba/Rust-Base-Builder/commits/main)
[![GitHub activity](https://img.shields.io/github/commit-activity/m/krystiandzirba/Rust-Base-Builder?color=green)](https://github.com/krystiandzirba/Rust-Base-Builder/commits)

</div>

<p align="center">
Rust Base Builder - an app for the popular video game "Rust" run by React Three Fiber. This tool allows you to create any base, simulate a raid and calculate all the building + upkeep cost.
</p>

<p align="center"> App: https://krystiandzirba.github.io/Rust-Base-Builder/ </p>

![RBB1](https://github.com/user-attachments/assets/a37cfb86-2bda-46d8-9b0b-aff557e48a49)

<h1 align="center"> 1. Edit Mode</h1>

<h2 align="center"> 1.1 Placing Models</h2>



<p align="center">
Build your base from scratch, or modify and view an existing one. <br>
To get started, select any object from the list on the left and place it on the grid. <br>
</p>


![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/placing_the_models.gif)

<h2 align="center"> 1.2 Rotating Models Before Placement</h2>

<p align="center">
Before placing an object, you can rotate it using the "Q" and "E" keys. <br>
Use the rotation wheel at the bottom (15° | 30° | 60° | 90°) to adjust the angle of rotation.
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/rotating_the_models.gif)

<h2 align="center"> 1.3 Symmetrical Building</h2>

<p align="center">
Enable the symmetry to automatically place mirrored objects along the X, Z, or X+Z axes.
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/models_symmetry.gif)

<h2 align="center"> 1.4 Setting Building Height</h2>

<p align="center">
Adjust the height at which you want to place the model. (1 = full model height).
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/models_height.gif)

<h2 align="center"> 1.5 Move, Rotate, and Transform Models with Keyboard Input</h2>

<p align="center">
- Use the WASD keys to move the selected object along the X, Y, or Z axis. <br>
- Move objects up and down using the "SPACE" and "CTRL" keys. <br>
- Rotate the object with the "Q" and "E" keys. <br>
- To delete a selected object, press "BACKSPACE ←" or "DEL".
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/models_keyboard_transform.gif)

<h2 align="center"> 1.6 Move, Rotate, and Transform Models with Mouse Input</h2>
<p align="center">
You can also manipulate models using mouse controls with the buttons located at the bottom of the screen.
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/models_mouse_transform.gif)

<h2 align="center"> 1.7 Transform Distance Units</h2>

<p align="center">
Adjust the multiplier value for model transformations. <br>
Choose from preset values like 0.125, 1 (default), or 5. <br>
Or set a custom value between 0 and 50.
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/models_distance_unit.gif)

<h2 align="center"> 1.8 Upgrade, Downgrade, or Delete Selected and All Models</h2>

<p align="center">
When an object is selected, a small menu will appear with three options: upgrade to a higher tier, downgrade to a lower tier, or delete. <br>
You can also enable the model eraser to remove any model with a single click or delete all models at once.
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/models_state.gif)

<h2 align="center"> 1.9 Pivot Controls</h2>

<p align="center">
For more dynamic model manipulation, enable the pivot controls to drag models across the canvas along specific axes.
</p>

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/pivot_controls.gif)

<h2 align="center"> 1.10 Placing Prebuilt Bases</h2>

<p align="center">
Select and place a prebuilt base from popular YouTube tutorials. <br>
Prebuilt base types:
</p>

- Tutorial: 1:1 ratio of stone, metal, and armored materials as seen in the tutorial.
- Stone: Base built entirely using stone models.
- Metal: Base built entirely using metal models.
- Armored: Base built entirely using armored models.

![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/placing_the_prebuilds.gif)

<h2 align="center"> 1.11 Build + Upkeep Cost</h2>

<p align="center">
All the build cost will be displayed on the right side along with the upkeep cost (scaling tiers):<br>
tier 1: 10% for the first 15 objects<br>
tier 2: 15% for next 75 objects<br>
tier 3: 20% for another 75 objects<br>
tier 4: 33% for any object above 175th<br>
  You can also enable the miscs (workbenches, storages, furnaces) to be counted in the build cost (with upkeep ommited)
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/99b6d076-1204-47e7-9f37-968d44ccf423" alt="Image">
  </p>

<h2 align="center"> 1.12 Models Visibility Settings</h2>
<p align="center">
    To get a clearer view of your base, you can toggle various modes or enable X-ray mode to render the entire base as a wireframe.
  </p>

  ![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/objects_visibility.gif)


<h1 align="center"> 2. Local Storage</h1>
<p align="center">
Any base or layout you create can be saved to your browser's local storage. If you reload the page or return later, your saved base will load automatically. <br>
You can also delete the saved base from local storage at any time.
  </p>

  ![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/local_storage.gif)

<h1 align="center"> 3. Import | Export Base</h1>

<p align="center">
If you'd like to share your base with a friend or move it to another device, there are two simple ways to do so.
  </p>

<h2 align="center"> 3.1 Export + Import via .txt File</h2>
<p align="center">
You can export and import your base using a .txt file, which contains all the data, including models, their positions, and rotations.

**To Export and Import via the .txt file:**

- Select the "Export" → "via .txt file". <br> 
- You can name your file or leave it with default name. <br> 
- press the "download the base .txt file". <br> 

**Another device | browser**

- Select the "Import" → "via .txt file". <br>
- Press the "+ Import base file". <br>
- Enable the model placing, "place the base (off → on)".
- Start placing the base on the canvas.
- Disable the model placing, "place the base (on → off)".
  </p>

  ![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/base_transfer_file.gif)

<h2 align="center"> 3.2 Export + Import via Generated Code</h2>
<p align="center">
If you prefer not to download a file, you can generate a code and use it in the import field.
  </p>

**To Export and Import via the generated code:**

- Select the "Export" → "via code". <br> 
- Press the "generate the base code" button. <br> 
- copy the generated code to the clipboard. <br>

  **Another device | browser**

- Select the "Import" → "via code". <br>
- Paste the generated code to the "enter / pase the base code" input field. <br>
- Press the "apply" button. <br>
- Enable the model placing, "place the base (off → on)".
- Start placing the base on the canvas.
- Disable the model placing, "place the base (on → off)".

  ![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/base_transfer_code.gif)


<h1 align="center"> 4. Raid Mode</h1>

<p align="center">
Simulate an raid attack on your own base to test its weaknesses.  <br>
  First, choose the weapon | tool you want to use for the raid:
</p>

- "most efficient" automatically calculate the most efficient way to destroy the selected structure.<br>
- rockets <br> 
- C4s <br> 
- EXP. 5.56 ammo<br>
- satchel charges<br> 
<br>
<p align="center">
Once you've selected the type, you can start destroying the objects with mouse click. <br>
If you want to start the raid again, or reset it, use the "reset raid" button.
</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/b2e3e0c1-8522-4114-acbd-5fb091a6e30d" alt="Image">
  </p>

  ![](https://github.com/krystiandzirba/Rust-Base-Builder/blob/master/public/readme_gifs/base_raid.gif)

<p align="center">
All raid costs will be displayed on the right side, categorized by weapon type and required resources. <br>
You can also enable the sub-ingredients and gunpowder calculator.
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/614dca09-524d-4d00-9a38-cd17da8cd7b4" alt="Image">
</p>

<h1 align="center">Future updates:</h1>

<p align="center">
- Mobile Support<br>  
- Add remaining important models and structures (external walls / fences / shelves / campfire / beds / research table / large furnace ... )<br>
- First person mode (depends on performance impact)<br>
- Pixel gap structures building<br>
- Rust-like object snapping (depends on performance impact)<br>
- Faster building<br>
- Object copy + paste<br>
- Undo button<br>
- Different switchable layouts<br>
- Performance Improvements<br>
- UI | UX tweaking<br>
- Custom rotation angles<br>
- Dynamic performance for low-end systems<br>
- Updated sounds<br>
</p>

_<h3 align="center">Please note that this app is GPU and Memory heavy, if you experience any performance issues, try using the ***Performance Mode*** available in the settings.</h3>_
