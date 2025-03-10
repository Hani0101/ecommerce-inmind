import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  standalone: false,
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  activeSection = "overview";
  isMobileView = false;
  personalInfoForm!: FormGroup;
  orderSearchForm!: FormGroup;
  defaultProfileImage = 'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U';

  userData = {
    name: "John Doe",
    totalOrders: 12,
    wishlistCount: 5,
    email: "john@example.com",
    phone: "+1234"
  };

  orders = [
    {
      id: "ORD001",
      date: new Date(2024, 0, 15),
      total: 299.99,
      status: "Delivered"
    },
    {
      id: "ORD002",
      date: new Date(2024, 1, 1),
      total: 149.99,
      status: "Processing"
    },
    {
      id: "ORD003",
      date: new Date(2024, 1, 10),
      total: 499.99,
      status: "Shipped"
    }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.checkScreenSize();
    this.initializeForm();
    window.addEventListener("resize", () => this.checkScreenSize());
  }

  initializeForm() {
    this.personalInfoForm = this.fb.group({
      fullName: [this.userData.name, [Validators.required, Validators.minLength(2)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      phone: [this.userData.phone, [Validators.required, Validators.pattern("^\\+?[1-9]\\d{1,14}$")]]
    });

    this.orderSearchForm = this.fb.group({
      searchTerm: [""],
      timeFilter: ["3months"]
    });
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768;
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  get filteredOrders() {
    let filtered = this.orders;
    const timeFilter = this.orderSearchForm.get("timeFilter")?.value;
    const searchTerm = this.orderSearchForm.get("searchTerm")?.value;
    if (timeFilter === "3months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filtered = filtered.filter(order => order.date >= threeMonthsAgo);
    }
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }

  updatePersonalInfo() {
    if (this.personalInfoForm.valid) {
      console.log("Form submitted:", this.personalInfoForm.value);
      alert("Personal information updated successfully!");
    } else {
      alert("Please fill out the form correctly.");
    }
  }

  logout() {
    this.router.navigate(["/log-in"]);
  }
}