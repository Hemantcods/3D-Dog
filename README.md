# Notes 
- @react-three/drei for easily giving orbit contols

- applying texture on the model directly makes it harder to load so a **normal map** is used to reduce processing and make the rendering smoother

- opengl by default loads on low quality colourspace and tectures the we have to manually upgrade the colourspace

- for scroll animation use  **GSAP** aslo its plugin called scroll trigger 

- in 3js model apperiance depend on shaders,
  * Types of shaders(language used glsl)
    * **fragment Shader**-tells the colour of each pixel/side 
    * **vertex Shader**- desides where the point/vertex will go