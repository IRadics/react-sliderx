[![npm (scoped)](https://img.shields.io/npm/v/@iradics/react-sliderx)](https://www.npmjs.com/package/@iradics/react-sliderx) [![npm (scoped)](https://img.shields.io/npm/dm/@iradics/react-sliderx)](https://www.npmjs.com/package/@iradics/react-sliderx) [![GitHub](https://img.shields.io/github/license/iradics/react-sliderx)](https://github.com/IRadics/react-sliderx/blob/master/license)

### For full documentation, compatibility and examples visit [sliderx.iradics.net](https://sliderx.iradics.net/)

##  Getting started
#### Add SliderX your project:

<Tabs>
  <TabItem value="npm" label="npm">

```bash
npm install @iradics/react-sliderx
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
npm yarn add @iradics/react-sliderx
```

  </TabItem>
</Tabs>

#### Import SliderX component(s) into your project:

```tsx
import { SliderXClassic, SliderXSelector } from "@iradics/react-sliderx";
```


---

##  SliderXSelector
A slider component with predefined positions to select from multiple options

<SliderXSelectorExample></SliderXSelectorExample>

<Tabs>
  <TabItem value="jsx" label="JavaScript / Typescript">

```jsx
<SliderXSelector
  optionCount={5}
  colors={["#3cc9a3", "#2f8eb8", "#6617a3", "#dea002", "#e00000"]}
  className={"sliderXSelectorExample"}
  labels={["option 1", "option 2", "option 3", "option 4", "option 5"]}
  animationTime={100}
  defaultOptionIndex={2}
></SliderXSelector>
```

  </TabItem>
</Tabs>

### Props

|                   Name |                 Type                 | Optional | Default | Description                                                                                          |
| ---------------------: | :----------------------------------: | :------: | ------- | ---------------------------------------------------------------------------------------------------- |
|          **className** |                string                |   true   |         | Additional classname to add to the component                                                         |
|           **onChange** |               function               |   true   |         | Returns the index of the selected option                                                             |
|             **colors** |                array                 |   true   |         | Array of RGB,RGBA or HEX colors                                                                      |
|        **optionCount** |                number                |  false   |         | Number of options                                                                                    |
| **defaultOptionIndex** |                number                |   true   | 0       | Initially selected option. Invalid index is defaulted to the min or max index                        |
|             **labels** |                array                 |   true   |         | Array of strings for labels. Pass "" for empty label. **\n** works for linebreaks                    |
|                 **id** |                string                |   true   |         | Custom ID for the direct slider \(<input\>) element which overwrites the default generated random ID |
|            **options** | EnumSliderXOptions |   true   |         | Slider behavior options. Use EnumSliderXOptions                                    |
|              **index** |                number                |   true   |         | Allows to externally control the selection. Invalid indexes are defaulted to min or max index.       |
|      **animationTime** |                number                |   true   | 0       | Time of full animation for selection change in microseconds. Use 0 for instant change.               |


---

##  SliderXClassic
Classic slider component with full range, implementing all the available easy styling possibilities.

Note that in this example, TypeScript implementation needs additional elements.

<SliderXClassicExample></SliderXClassicExample>

<Tabs>
  <TabItem value="jsx" label="JavaScript">

```jsx
export const SliderXClassicExample = () => {
  const [color, setcolor] = useState("rgba(102,23,163,1)");
  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <SliderXClassic
        defaultValue={100}
        min={0}
        max={100}
        colors={[color]}
        className={"sliderXClassicExample"}
        onChange={(e) => {
          setcolor(`rgba(102,23,163,${e.target.value / 100})`);
        }}
      ></SliderXClassic>
    </div>
  );
};
```

</TabItem>

  <TabItem value="tsx" label="TypeScript">

```tsx
import { SliderXClassic, Color } from "@iradics/react-sliderx";

export const SliderXClassicExample = () => {
  const [color, setcolor] = useState<Color>("rgba(102,23,163,1)");
  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <SliderXClassic
        defaultValue={100}
        min={0}
        max={100}
        colors={[color]}
        className={"sliderXClassicExample"}
        onChange={(e) => {
          setcolor(`rgba(102,23,163,${parseInt(e.target.value) / 100})`);
        }}
      ></SliderXClassic>
    </div>
  );
};
```

</TabItem>

<TabItem value="css" label="CSS">

```css
.sliderXClassicExample {
  --sliderX-thumb-width: 1.5em;
  --sliderX-thumb-height: 3em;
  --sliderX-track-height: 2em;
  --sliderX-track-border-radius: 0.3em;
  --sliderX-thumb-border: 5px outset var(--sliderX-var-dynamic-color);
  --sliderX-thumb-color: white;
  --sliderX-thumb-color: white;
  --sliderX-track-box-shadow: 0px 0px 30px var(--sliderX-var-dynamic-color);
  --sliderX-thumb-box-shadow: 0px 0px 30px var(--sliderX-var-dynamic-color);
}
```

</TabItem>
</Tabs>

### Props

|             Name | Type                                 | Optional | Default | Description                                                                                          |
| ---------------: | ------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
|          **min** | number                               | true     | 0       | Minimum value                                                                                        |
|          **max** | number                               | true     | 100     | Maximum value                                                                                        |
|         **step** | number                               | true     | 1       | Specifies the number intervals                                                                       |
|    **className** | string                               | true     |         | Additional classname to add to the component                                                         |
|     **onChange** | function                             | true     |         | Returns the HTMLinput change event                                                                   |
|       **colors** | array                                | true     |         | Array of RGB,RGBA or HEX colors                                                                      |
| **defaultValue** | number                               | true     | min     | Sets the initial value of the slider                                                                 |
|           **id** | string                               | true     |         | Custom ID for the direct slider \(<input\>) element which overwrites the default generated random ID |
|      **options** | EnumSliderXOptions | true     |         | Slider behavior options. Use EnumSliderXOptions                                    |
|        **value** | number                               | true     |         | Controls the value of the slider externally.                                                         |


---

##  SliderX Options
You can pass additional options which change the behaviour of the SliderX component.

Use <ColorText color="#25c2a0">**EnumSliderXOptions**</ColorText> to access these options.

<Tabs>

  <TabItem value="jsx" label="JavaScript / Typescript">

```jsx
<SliderXSelector
  ...
  options={EnumSliderXOptions.DynamicColorSampleRight | EnumSliderXOptions.ClickableLabels}
  ...
></SliderXSelector>
```

</TabItem>

</Tabs>

| <ColorText color="#25c2a0">EnumSliderXOptions.</ColorText> | Selector | Classic | Description                                                                                                                                                                                                                 |
| ---------------------------------------------------------: | :------: | :-----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                    DynamicColorSampleRight |    x     |    x    | In case of the thumb being exactly between two colors, sample the right side color of the thumb instead of the left side <SliderXExampleColorSample></SliderXExampleColorSample>                                            |
|                                     DisableCenteredOptions |    x     |         | Disable the default centering of the options in SliderXSelector. This way the selectable options span from the very beginning of the slider to the very end <SliderXExampleDisableCentered></SliderXExampleDisableCentered> |
|                                            ClickableLabels |    x     |         | Makes click on the labels change the slider position <SliderXExampleClickableLabels></SliderXExampleClickableLabels>                                                                                                        |

