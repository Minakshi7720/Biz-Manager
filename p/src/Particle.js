import * as React from "react";
import Particles from "react-tsparticles";
import styles from './index.css';

export default function Particle() {
    return (
        <div >
            <Particles 
        params={{
          fpsLimit: 60,
          particles: {
            color: {
              value: "#65d0ce"
            },
            links: {
              enable: true,
              color: "#0f1c70",
              distance: 100
            },
            move: {
              enable: true,
              outMode: "bounce",
              speed: .5,
            }
          }
        }}
      />
        </div>
    )
}