/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

/** types */
import type { IParticlesProps, ParticlesPluginRegistrar } from '@tsparticles/react';

const particlesInit: ParticlesPluginRegistrar = async (engine) => {
    await loadSlim(engine);
};

function Particle(props: IParticlesProps) {
    const { options } = props;
    const id = React.useId();

    return (
        <ParticlesProvider init={particlesInit}>
            <Particles id={`client-particle-${id}`} options={options} />
        </ParticlesProvider>
    );
}
export { Particle };
export default Particle;
