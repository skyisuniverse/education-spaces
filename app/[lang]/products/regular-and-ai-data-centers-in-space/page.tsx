import WithDictionary from '../../components/WithDictionary';
import RegularAndAIDataCentersInSpaceClient from './RegularAndAIDataCentersInSpaceClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <RegularAndAIDataCentersInSpaceClient dict={dict} />}
    </WithDictionary>
  );
}