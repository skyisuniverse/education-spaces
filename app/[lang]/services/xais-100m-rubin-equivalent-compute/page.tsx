import WithDictionary from '../../components/WithDictionary';
import Xais100MRubinEquivalentComputeClient from './Xais100MRubinEquivalentComputeClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <Xais100MRubinEquivalentComputeClient dict={dict} />}
    </WithDictionary>
  );
}