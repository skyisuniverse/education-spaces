import WithDictionary from '../../components/WithDictionary';
import ArchitectureDecisionRecordsClient from './ArchitectureDecisionRecordsClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ArchitectureDecisionRecordsClient dict={dict} />}
    </WithDictionary>
  );
}