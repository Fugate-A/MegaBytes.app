import React from 'react';

function IndexInfo() {
	return (
		<div className='bg-page-background indexdiv flex items-center justify-center h-screen bg-orange-300'>
			<div className="flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-max">
					<a href='http://localhost:3000/'>
						<h2 className="mt-10 text-center text-8xl font-bold leading-9 tracking-wide text-gray-50 content-center 
									   transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 duration-300">
							READY TO COOK!
						</h2>
					</a>
				</div>
			</div>
		</div>
	);
};
export default IndexInfo;
