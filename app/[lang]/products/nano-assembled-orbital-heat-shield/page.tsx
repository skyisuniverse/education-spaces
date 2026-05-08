import WithDictionary from '../../components/WithDictionary';
import NanoAssembledOrbitalHeatShieldClient from './NanoAssembledOrbitalHeatShieldClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledOrbitalHeatShieldClient dict={dict} />}
    </WithDictionary>
  );
}