import WithDictionary from '../../components/WithDictionary';
import JobsSpacesClient from './JobsSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <JobsSpacesClient dict={dict} />}
    </WithDictionary>
  );
}