import WithDictionary from '../../components/WithDictionary';
import AutomatedDesignManufacturingPipelineClient from './AutomatedDesignManufacturingPipelineClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <AutomatedDesignManufacturingPipelineClient dict={dict} />}
    </WithDictionary>
  );
}