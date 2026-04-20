'use client';
import { cn } from '../../lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 150;
		const AMOUNTX = 40;
		const AMOUNTY = 60;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 355, 1220);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);

		containerRef.current.appendChild(renderer.domElement);

		const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
		const colors = new Float32Array(AMOUNTX * AMOUNTY * 3);

		let i = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				positions[i * 3] = x;
				positions[i * 3 + 1] = 0;
				positions[i * 3 + 2] = z;

				if (theme === 'light') {
					colors[i * 3] = 0;
					colors[i * 3 + 1] = 0;
					colors[i * 3 + 2] = 0;
				} else {
					colors[i * 3] = 0.8;
					colors[i * 3 + 1] = 0.8;
					colors[i * 3 + 2] = 0.8;
				}
				i++;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		const handleResize = () => {
			if (!containerRef.current) return;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);

		renderer.setAnimationLoop(() => {
			const time = performance.now() * 0.001 * 0.5;
			const positionAttribute = geometry.attributes.position;
			const array = positionAttribute.array as Float32Array;

			let index = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					array[index * 3 + 1] =
						Math.sin((ix + time * 10) * 0.3) * 50 +
						Math.sin((iy + time * 10) * 0.5) * 50;
					index++;
				}
			}

			positionAttribute.needsUpdate = true;
			renderer.render(scene, camera);
		});

		return () => {
			window.removeEventListener('resize', handleResize);
			renderer.setAnimationLoop(null);
			
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			if (containerRef.current && renderer.domElement) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 z-0', className)}
			{...props}
		/>
	);
}
