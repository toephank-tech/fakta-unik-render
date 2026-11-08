import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Intro } from "./Intro";
import { TrueCrimeTeaser } from "./TrueCrimeTeaser";
import { BoyInTheBox } from "./BoyInTheBox";
import { ZodiacKiller } from "./ZodiacKiller";
import { SomertonMan } from "./SomertonMan";
import { KidsMilo } from "./KidsMilo";
import { KidsLuna } from "./KidsLuna";
import { KidsBenny } from "./KidsBenny";
import { BoyInBoxShorts } from "./BoyInBoxShorts";
import { BoyInBoxMotion } from "./BoyInBoxMotion";
import { BoyInBoxCombo } from "./BoyInBoxCombo";
import { FactsHeartCombo } from "./FactsHeartCombo";
import { FactsMitoMotion } from "./FactsMitoMotion";
import { FactsNeuronsCombo } from "./FactsNeuronsCombo";
import { FactsWBCMotion } from "./FactsWBCMotion";
import { FactsRemParalysis } from "./FactsRemParalysis";
import { FactsDnaBananaMotion } from "./FactsDnaBananaMotion";
import { FactsDreamsMotion } from "./FactsDreamsMotion";
import { FactsBrainMotion } from "./FactsBrainMotion";
import { FactsGlymphaticMotion } from "./FactsGlymphaticMotion";
import { FactsDreams2HoursMotion } from "./FactsDreams2HoursMotion";
import { FactsSleepMemoryMotion } from "./FactsSleepMemoryMotion";
import { FactsLessSleepHungrierMotion } from "./FactsLessSleepHungrierMotion";
import { FactsPoorSleepImmunityMotion } from "./FactsPoorSleepImmunityMotion";
import { FactsBrain13msMotion } from "./FactsBrain13msMotion";
import { FactsBrainMemoryMotion } from "./FactsBrainMemoryMotion";
import { FactsBrainNoPainMotion } from "./FactsBrainNoPainMotion";
import { FactsBabyBrainMotion } from "./FactsBabyBrainMotion";
import { FactsLeftRightBrainMotion } from "./FactsLeftRightBrainMotion";
import { FactsDnaSharedMotion } from "./FactsDnaSharedMotion";
import { FactsTelomeresMotion } from "./FactsTelomeresMotion";
import { FactsGutSecondBrainMotion } from "./FactsGutSecondBrainMotion";
import { FactsBacteriaMotion } from "./FactsBacteriaMotion";
import { FactsGutVagusMotion } from "./FactsGutVagusMotion";
import { FactsSkin28DaysMotion } from "./FactsSkin28DaysMotion";
import { FactsSkinShedMotion } from "./FactsSkinShedMotion";
import { FactsGoosebumpsMotion } from "./FactsGoosebumpsMotion";
import { FactsSneezeMotion } from "./FactsSneezeMotion";
import { FactsYawningMotion } from "./FactsYawningMotion";
import { FactsDreamCyclesMotion } from "./FactsDreamCyclesMotion";
import { FactsNightmaresMotion } from "./FactsNightmaresMotion";
import { FactsBlindDreamsMotion } from "./FactsBlindDreamsMotion";
import { FactsBWDreamsMotion } from "./FactsBWDreamsMotion";
import { FactsSleepwalkingMotion } from "./FactsSleepwalkingMotion";
import { FactsLifetimeSleepMotion } from "./FactsLifetimeSleepMotion";
import { FactsMicrosleepMotion } from "./FactsMicrosleepMotion";
import { FactsBodyCoolsMotion } from "./FactsBodyCoolsMotion";
import { FactsNasaNapMotion } from "./FactsNasaNapMotion";
import { FactsDreamRealityMotion } from "./FactsDreamRealityMotion";
import { FactsNerveSpeedMotion } from "./FactsNerveSpeedMotion";
import { FactsShortTermMemory7Motion } from "./FactsShortTermMemory7Motion";
import { FactsBrain20WattsMotion } from "./FactsBrain20WattsMotion";
import { FactsBrain73WaterMotion } from "./FactsBrain73WaterMotion";
import { FactsBrainShrinksMotion } from "./FactsBrainShrinksMotion";
import { FactsBrainNewNeuronsMotion } from "./FactsBrainNewNeuronsMotion";
import { FactsPlaceboEffectMotion } from "./FactsPlaceboEffectMotion";
import { FactsBrainDaydreamingMotion } from "./FactsBrainDaydreamingMotion";
import { FactsPhantomLimbMotion } from "./FactsPhantomLimbMotion";
import { FactsDejaVuMotion } from "./FactsDejaVuMotion";
import { FactsThoughts6200Motion } from "./FactsThoughts6200Motion";
import { FactsDna2MetresMotion } from "./FactsDna2MetresMotion";
import { Facts37TrillionCellsMotion } from "./Facts37TrillionCellsMotion";
import { FactsHeartLongMotion } from "./FactsHeartLongMotion";
import { FactsGlymphaticLongMotion } from "./FactsGlymphaticLongMotion";
import { FactsDreams2HoursLongMotion } from "./FactsDreams2HoursLongMotion";
import { FactsSleepMemoryLongMotion } from "./FactsSleepMemoryLongMotion";
import { KidsMiloShare } from "./KidsMiloShare";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="BoyInTheBox"
        component={BoyInTheBox}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TrueCrimeTeaser"
        component={TrueCrimeTeaser}
        durationInFrames={450}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ZodiacKiller"
        component={ZodiacKiller}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SomertonMan"
        component={SomertonMan}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="KidsMiloShare"
        component={KidsMiloShare}
        durationInFrames={6300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="KidsMilo"
        component={KidsMilo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="KidsLuna"
        component={KidsLuna}
        durationInFrames={6480}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="KidsBenny"
        component={KidsBenny}
        durationInFrames={5400}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BoyInBoxShorts"
        component={BoyInBoxShorts}
        durationInFrames={2700}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BoyInBoxMotion"
        component={BoyInBoxMotion}
        durationInFrames={2700}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BoyInBoxCombo"
        component={BoyInBoxCombo}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsHeartCombo"
        component={FactsHeartCombo}
        durationInFrames={2700}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsMitoMotion"
        component={FactsMitoMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsRemParalysis"
        component={FactsRemParalysis}
        durationInFrames={2700}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsNeuronsCombo"
        component={FactsNeuronsCombo}
        durationInFrames={2700}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsWBCMotion"
        component={FactsWBCMotion}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrainMotion"
        component={FactsBrainMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrainNoPainMotion"
        component={FactsBrainNoPainMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBabyBrainMotion"
        component={FactsBabyBrainMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsLeftRightBrainMotion"
        component={FactsLeftRightBrainMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsTelomeresMotion"
        component={FactsTelomeresMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsGutSecondBrainMotion"
        component={FactsGutSecondBrainMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBacteriaMotion"
        component={FactsBacteriaMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsGutVagusMotion"
        component={FactsGutVagusMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsSkin28DaysMotion"
        component={FactsSkin28DaysMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsSkinShedMotion"
        component={FactsSkinShedMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsSneezeMotion"
        component={FactsSneezeMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDreamCyclesMotion"
        component={FactsDreamCyclesMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsNightmaresMotion"
        component={FactsNightmaresMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBlindDreamsMotion"
        component={FactsBlindDreamsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBWDreamsMotion"
        component={FactsBWDreamsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsLifetimeSleepMotion"
        component={FactsLifetimeSleepMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsMicrosleepMotion"
        component={FactsMicrosleepMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBodyCoolsMotion"
        component={FactsBodyCoolsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsNasaNapMotion"
        component={FactsNasaNapMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsNerveSpeedMotion"
        component={FactsNerveSpeedMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsShortTermMemory7Motion"
        component={FactsShortTermMemory7Motion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrain20WattsMotion"
        component={FactsBrain20WattsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrain73WaterMotion"
        component={FactsBrain73WaterMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrainShrinksMotion"
        component={FactsBrainShrinksMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrainNewNeuronsMotion"
        component={FactsBrainNewNeuronsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsPlaceboEffectMotion"
        component={FactsPlaceboEffectMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrainDaydreamingMotion"
        component={FactsBrainDaydreamingMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsPhantomLimbMotion"
        component={FactsPhantomLimbMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDejaVuMotion"
        component={FactsDejaVuMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsThoughts6200Motion"
        component={FactsThoughts6200Motion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDna2MetresMotion"
        component={FactsDna2MetresMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Facts37TrillionCellsMotion"
        component={Facts37TrillionCellsMotion}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FactsHeartLongMotion"
        component={FactsHeartLongMotion}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FactsGlymphaticLongMotion"
        component={FactsGlymphaticLongMotion}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FactsDreams2HoursLongMotion"
        component={FactsDreams2HoursLongMotion}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FactsSleepMemoryLongMotion"
        component={FactsSleepMemoryLongMotion}
        durationInFrames={2700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FactsDreamRealityMotion"
        component={FactsDreamRealityMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsSleepwalkingMotion"
        component={FactsSleepwalkingMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsYawningMotion"
        component={FactsYawningMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsGoosebumpsMotion"
        component={FactsGoosebumpsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDnaSharedMotion"
        component={FactsDnaSharedMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsGlymphaticMotion"
        component={FactsGlymphaticMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDreams2HoursMotion"
        component={FactsDreams2HoursMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsSleepMemoryMotion"
        component={FactsSleepMemoryMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsLessSleepHungrierMotion"
        component={FactsLessSleepHungrierMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsPoorSleepImmunityMotion"
        component={FactsPoorSleepImmunityMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrain13msMotion"
        component={FactsBrain13msMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsBrainMemoryMotion"
        component={FactsBrainMemoryMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDnaBananaMotion"
        component={FactsDnaBananaMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="FactsDreamsMotion"
        component={FactsDreamsMotion}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />

    </>
  );
};
