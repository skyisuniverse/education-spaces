import WithDictionary from '../../components/WithDictionary';
import TrainingAIModelsInMinutesClient from './TrainingAIModelsInMinutesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <TrainingAIModelsInMinutesClient dict={dict} />}
    </WithDictionary>
  );
}