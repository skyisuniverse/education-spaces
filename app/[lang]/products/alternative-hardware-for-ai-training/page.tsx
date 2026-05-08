import WithDictionary from '../../components/WithDictionary';
import AlternativeHardwareForAiTrainingClient from './AlternativeHardwareForAiTrainingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <AlternativeHardwareForAiTrainingClient dict={dict} />}
    </WithDictionary>
  );
}