import WithDictionary from '../../components/WithDictionary';
import SolarSystemHabitationClient from './SolarSystemHabitationClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SolarSystemHabitationClient dict={dict} />}
    </WithDictionary>
  );
}