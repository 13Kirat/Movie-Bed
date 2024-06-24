const Dropdown = ({ title, options, func }) => {
	return (
		<div className="select">
			<select onChange={func}>
				<option>
					{title}
				</option>
				{options.map((o, i) => (
					<option key={i} value={o}>
						{o.toUpperCase()}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
