import React from "react";
import {
	Box,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

const PlaceDetails = ({ place, selected, refProp }) => {
	if (selected)
		refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	const classes = useStyles();

	return (
		<Card elevation={6}>
			<CardMedia
				style={{ height: 350 }}
				image={
					// if the place has a photo, use the photo, otherwise use this dummy image.
					place.photo
						? place.photo.images.large.url
						: "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
				}
				title={place.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5">
					{place.name}
				</Typography>
				{/* Review data */}
				<Box display="flex" justifyContent="space-between" my={2}>
					<Rating name="read-only" value={Number(place.rating)} readOnly />
					<Typography component="legend">
						{place.num_reviews} review{place.num_reviews > 1 && "s"}
					</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					{/* Price data */}
					<Typography component="legend">Price</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.price_level}
					</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					{/* Ranking data */}
					<Typography component="legend">Ranking</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.ranking}
					</Typography>
				</Box>
				{/* If the place has won awards, display them */}
				{place?.awards?.map((award) => (
					<Box
						display="flex"
						justifyContent="space-between"
						my={1}
						alignItems="center"
					>
						<img src={award.images.small} />
						<Typography variant="subtitle2" color="textSecondary">
							{award.display_name}
						</Typography>
					</Box>
				))}
				{/* Displays the cuisine type */}
				{place?.cuisine?.map(({ name }) => (
					<Chip key={name} size="small" label={name} className={classes.chip} />
				))}
				{/* Address logic */}
				{place.address && (
					<Typography
						gutterBottom
						variant="body2"
						color="textSecondary"
						className={classes.subtitle}
					>
						<LocationOnIcon />
						{place.address}
					</Typography>
				)}
				{/* Phone number logic */}
				{place.phone && (
					<Typography
						variant="body2"
						color="textSecondary"
						className={classes.spacing}
					>
						<PhoneIcon /> {place.phone}
					</Typography>
				)}
			</CardContent>
			<CardActions>
				<Button
					size="small"
					color="primary"
					// Takes you to the restaurants trip advisor page
					onClick={() => window.open(place.web_url, "_blank")}
				>
					Trip Advisor
				</Button>
				<Button
					size="small"
					color="primary"
					// This takes you to the restaurants actual website
					onClick={() => window.open(place.website, "_blank")}
				>
					Website
				</Button>
			</CardActions>
		</Card>
	);
};

export default PlaceDetails;
